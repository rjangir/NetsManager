import React, { useState, useEffect } from 'react'
import {
  Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap'
import Player from './Components/Players/Player';
import PlayerList from './Components/Players/PlayerList'

function App(props) {

  const [items, setItems] = useState([])

  const getItems = () => {
    fetch('http://localhost:3000/players')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }

  const addItemToState = (item) => {
    setItems([...items, item]);
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...items.slice(itemIndex + 1)
    ]
    setItems(newArray)
  }

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  useEffect(() => {
    getItems()
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <Card >
            <CardBody>
              <h1>Package Plan</h1>
              <h1 className="text-center">100 Hours</h1>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card >
            <CardBody>
              <h1>Pakage Usage</h1>
              <h1 className="text-center">10</h1>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card >
            <CardBody>
              <h1>Total Sessions</h1>
              <h1 className="text-center">18</h1>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Col>
                <Row>
                  <Col>
                    <h1 style={{ margin: "20px 0" }}>Players</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <PlayerList items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Player buttonLabel="Add Player" addItemToState={addItemToState} />
                  </Col>
                </Row>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )

}

export default App