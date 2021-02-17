import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import './App.module.scss';

import StatusPage from './status/StatusPage';
import ServicePage from './ServicePage';
import UsersPage from './users/UsersPage';
import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Container className="main-container">
        <Switch>
          <Route exact path="/" component={StatusPage} />
          <Route exact path="/service" component={ServicePage} />
          <Route exact path="/users" component={UsersPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
