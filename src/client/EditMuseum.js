import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class EditMuseum extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // store information relating to the museum in state
    // should match the museum object from the API
    this.state = {
      _id: '',
      name: '',
      location: '',
      email: ''
    };

  }

  componentDidMount() {
  // when this Component mounts, get data relating to museum to be edited
  // the museums's ID is passed in via the URL and accessed via props
    axios.get('/api/museum/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          name: response.data.name,
          location: response.data.location,
          email: response.data.email
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // send a put request to the server
    // the request includes the state, which is the updated museum info
    axios.put('/api/museum', this.state)
      .then(res => this.props.history.push('/')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return (
      <div>
        <h3>Update Museum</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input  type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input  type="text"
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input  type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update Museum" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditMuseum;
