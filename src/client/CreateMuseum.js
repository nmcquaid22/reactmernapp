import React, { Component } from 'react';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
// create museum class - creates new museum component by posting date into the database then rendering it onto the museum list
export default class CreateMuseum extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      location: '',
      email: ''
    };
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

    console.log('Form submitted:');
    console.log(`Museum Name: ${this.state.name}`);
    console.log(`Museum Location: ${this.state.location}`);
    console.log(`Museum Email: ${this.state.email}`);


    const newMuseum = {
      name: this.state.name,
      location: this.state.location,
      email: this.state.email

    };

    axios.post('/api/museum', newMuseum)
      .then(res => console.log(res.data));

    this.setState({
      name: '',
      location: '',
      email: ''

    });
  }

  render() {
    return (
      <div>
        <h3>Create New Museum</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input  type="text"
              className="form-control"
              autoComplete="none"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input  type="text"
              className="form-control"
              autoComplete="none"
              value={this.state.location}
              onChange={this.onChangeLocation}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input  type="text"
              className="form-control"
              autoComplete="none"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Museum" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
