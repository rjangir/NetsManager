import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class PlayerAddEdit extends React.Component {
    state = {
        id: 0,
        name: '',
        amount_paid: 0,
        created_date: ''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => {
        e.preventDefault()
        fetch('http://localhost:3000/players', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                amount_paid: this.state.amount_paid,
                created_date: this.state.created_date,
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    this.props.addItemToState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/players', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                amount_paid: this.state.amount_paid,
                created_date: this.state.created_date,
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    // console.log(item[0])
                    this.props.updateState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        // if item exists, populate the state with proper data
        if (this.props.item) {
            const { id, name, amount_paid, creatd_date } = this.props.item
            this.setState({ id, name, amount_paid, creatd_date })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
                </FormGroup>
                <FormGroup>
                    <Label for="amount_paid">Amount Paid</Label>
                    <Input type="text" name="amount_paid" id="amount_paid" onChange={this.onChange} value={this.state.amount_paid === null ? '' : this.state.amount_paid} />
                </FormGroup>
                <FormGroup>
                    <Label for="created_date">Amount Paid</Label>
                    <Input type="text" name="created_date" id="created_date" onChange={this.onChange} value={this.state.created_date === null ? '' : this.state.created_date} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default PlayerAddEdit