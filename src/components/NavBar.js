import React from 'react';
import {Menu, Container, Header} from 'semantic-ui-react';
import {useHistory} from 'react-router';
import styles from './NavBar.module.scss';

import UserInfo from './users/UserInfo';
import ViewSwitcher from './users/ViewSwitcher'

export default function NavigationMenu() {
  const history = useHistory();

  return (
    <Menu className={styles.navbar}>
      <Container>
        <Menu.Item
          as="a"
          header
          onClick={() => {
            history.push('/');
          }}
        >
          <Header as="h3">Licmon</Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <ViewSwitcher />
          </Menu.Item>
          <Menu.Item>
            <UserInfo />
          </Menu.Item>
        </Menu.Menu>
        
      </Container>
    </Menu>
  );
}
