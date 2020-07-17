import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import PlayerAddEdit from './PlayerAddEdit'

function Player(props) {

    const [player, setPlayer] = useState(false)
    const toggle = () => {
        setPlayer(!player)
    }

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>

    const label = props.buttonLabel

    let button = ''
    let title = ''

    if (label === 'Edit') {
        button = <Button
            color="warning"
            onClick={toggle}
            style={{ float: "left", marginRight: "10px" }}>{label}
        </Button>
        title = 'Edit Item'
    } else {
        button = <Button
            color="success"
            onClick={toggle}
            style={{ float: "left", marginRight: "10px" }}>{label}
        </Button>
        title = 'Add New Item'
    }


    return (
        <div>
            {button}
            <Modal isOpen={player} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
                <ModalBody>
                    <PlayerAddEdit
                        addItemToState={props.addItemToState}
                        updateState={props.updateState}
                        toggle={toggle}
                        item={props.item} />
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Player