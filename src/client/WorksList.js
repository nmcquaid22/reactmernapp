import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './app.css';

// a museum can have many works(pieces of art)
// works lists acts similar to museum list, it gets the works data from the api and returns in a list format.
class WorksList extends Component {
  constructor(props) {
    super(props);
    this.state = { works: [] };
  }

  componentDidMount() {
    axios.get(`api/museum/${this.props.match.params.id}/works`)
      .then(response => {
        this.setState({ works: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const worksList = this.state.works.map(u => (
      <Works
        key={u._id}
        id={u._id}
        name={u.name}
        amount={u.amount}
        age={u.age}
      />
    ));

    return (
      <div>
        {worksList.length ?
          <div>
            <h2>All Works</h2>
            <div>{worksList}</div></div> :
          <h2>No Works</h2> }
      </div>
    );
  }
}

const Works = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Amount: {props.amount}</p>
      <p>Age: {props.age} years old</p>
    </div>
  );
};

export default WorksList;
