import React, { useState } from 'react'
import { Table, Button } from 'reactstrap';
import Player from './Player';

function PlayerList(props) {

    const [items, deleteItem] = useState(0);

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete item forever?')
        if (confirmDelete) {
            fetch('http://localhost:3000/crud', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })
                .then(response => response.json())
                .then(item => {
                    this.props.deleteItemFromState(id)
                })
                .catch(err => console.log(err))
        }

    }


    const items = this.props.items.map(item => {
        return (
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.created_date}</td>
                <td>
                    <div style={{ width: "110px" }}>
                        <Player buttonLabel="Edit" item={item} updateState={this.props.updateState} />
                        {' '}
                        <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <Table responsive hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date Joined</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </Table>
    )
}

export default PlayerList