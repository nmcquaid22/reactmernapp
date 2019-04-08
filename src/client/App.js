import React from 'react';
import { HashRouter, Route, Link} from 'react-router-dom';
import MuseumList from './MuseumList';
import WorksList from './WorksList';
import EditMuseum from './EditMuseum';
import CreateMuseum from './CreateMuseum';
import { Nav, Navbar, Card, Button, Container, Row } from 'react-bootstrap';


// 'main' Component. Sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div className="container">


        <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">Home</Link>

          <Nav className="navbar-nav mr-auto" variant="tabs" >
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Museum</Link>
            </li>
          </Nav>

        </Navbar>



        <div className="jumbotron">
          <Route exact path="/" component={MuseumList}/>
          <Route path="/works/:id" component={WorksList}/>
          <Route path="/edit/:id" component={EditMuseum}/>
          <Route path="/create" component={CreateMuseum}/>

        </div>
      </div>
    </HashRouter>
  );
};

export default App;
