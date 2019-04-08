import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Museum from './Museum';
import axios from 'axios';
import './app.css';
import { Card, Button, Container, Row } from 'react-bootstrap';


// museum list - handles the update and delete api requests, displays the components in a list
class MuseumList extends Component {
  constructor(props) {
    super(props);

    this.state = { museum: [] };

    this.updateMuseum = this.updateMuseum.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // when the component mounts, get museum data from the server
    this.updateMuseum();
  }

  updateMuseum() {
  // get request to the server for the museum data and store it in state
    axios.get('api/museum')
      .then(response => {
        this.setState({ museum: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(museumId) {
  // delete request to the server to remove a museum with the museum id
    axios
      .delete('api/museum', {
        data: {
          id: museumId
        }
      })
      .then(response => {
        // if delete was successful, get the list of museums again to the new list appears
        this.updateMuseum();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const museumList = this.state.museum.map(u => (
      <Museum
        key={u._id}
        id={u._id}
        name={u.name}
        location={u.location}
        email={u.email}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <div>
        <h2>All Museums</h2>
        <Container>
          <Row>

            {museumList}

          </Row>
        </Container>
      </div>
    );
  }
}

export default MuseumList;
