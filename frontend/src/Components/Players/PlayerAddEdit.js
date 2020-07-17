import { React, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function PlayerAddEdit(props) {

    const [form, setValues] = useState({
        id: 0,
        name: '',
        amount_paid: 0,
        created_date: ''
    })

    const onChange = e => {
        setValues({ ...form, [e.target.name]: e.target.value })
    }

    const submitFormAdd = e => {
        e.preventDefault()
        fetch('http://localhost:3000/players', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name,
                amount_paid: form.amount_paid,
                created_date: form.created_date,
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    props.addItemToState(item[0])
                    props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    const submitFormEdit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/players', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: form.id,
                name: form.name,
                amount_paid: form.amount_paid,
                created_date: form.created_date,
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    // console.log(item[0])
                    props.updateState(item[0])
                    props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (props.item) {
            const { id, name, amount_paid, creatd_date } = props.item
            setValues({ id, name, amount_paid, creatd_date })
        }
    })

    return (
        <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" onChange={onChange} value={form.name === null ? '' : form.name} />
            </FormGroup>
            <FormGroup>
                <Label for="amount_paid">Amount Paid</Label>
                <Input type="text" name="amount_paid" id="amount_paid" onChange={onChange} value={form.amount_paid === null ? '' : form.amount_paid} />
            </FormGroup>
            <FormGroup>
                <Label for="created_date">Amount Paid</Label>
                <Input type="text" name="created_date" id="created_date" onChange={onChange} value={form.created_date === null ? '' : form.created_date} />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    );
}

export default PlayerAddEdit