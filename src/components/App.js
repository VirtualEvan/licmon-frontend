import React from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import './App.module.scss';
import {getNotifications} from '../core/selectors';

import Notification from './Notification';
import StatusPage from './status/StatusPage';
import ServicePage from './ServicePage';
import UsersPage from './users/UsersPage';
import NavBar from './NavBar';

function App() {
  const notifications = useSelector(getNotifications);

  return (
    <Router>
      <NavBar />
      {notifications.map(notif => (
        <Notification key={notif.id} id={notif.id} message={notif.message} type={notif.type} />
      ))}
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
