import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Player from './Components/Players/Player';
import PlayerList from './Components/Players/PlayerList'

function App(props) {

  const [items, setItems] = useState([])

  getItems = () => {
    fetch('http://localhost:3000/players')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    setValues(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = items.findIndex(data => data.id === item.id)
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...items.slice(itemIndex + 1)
    ]
    setItems({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems({ items: updatedItems })
  }

  useEffect(() => {
    fetch('http://localhost:3000/players')
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }, []);

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>PLayers</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <PlayerList items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{ float: "left", marginRight: "10px" }}
              className="btn btn-primary"
              data={items}>
              Download CSV
            </CSVLink> */}
          <Player buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
    </Container>
  )

}

export default App