import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Grid} from 'semantic-ui-react';

import './App.css';
import NavigationMenu from './NavigationMenu';
import StatusPage from './status/StatusPage';
import ServicePage from './ServicePage';
import UsersPage from './users/UsersPage';

function App() {
  return (
    <Router>
      <Grid padded>
        <Grid.Column tablet={3} computer={3} only="tablet computer" id="sidebar">
          <NavigationMenu />
        </Grid.Column>

        <Grid.Column mobile={16} tablet={13} computer={13} floated="right" id="content">
          <Switch>
            <Route exact path="/" component={StatusPage} />
            <Route exact path="/service" component={ServicePage} />
            <Route exact path="/users" component={UsersPage} />
          </Switch>
        </Grid.Column>
      </Grid>
    </Router>
  );
}

export default App;