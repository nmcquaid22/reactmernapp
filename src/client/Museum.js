import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row } from 'react-bootstrap';
import './app.css';


// museum component
class Museum extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Card style={{ width: '18rem', marginBottom: '2rem', marginRight:'1rem', marginLeft:'1rem'}} className="text-center">
              <Card.Body>
                <h5>{this.props.name}</h5>
                <p>Location: {this.props.location}</p>
                <p>Email: {this.props.email}</p>

                <Link to={`/works/${this.props.id}`}>
                  <Button variant="info" type="button">
                              View works
                  </Button>
                </Link>
                <Card.Body>
                  <Link to={`/edit/${this.props.id}`}>
                    <Button variant="link" type="button">
                                Edit
                    </Button>
                  </Link>

                  <Button variant="link" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                    Delete
                  </Button>

                </Card.Body>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Museum;
