import React from 'react';
import {Menu, Container, Header} from 'semantic-ui-react';
import {useHistory} from 'react-router';
import styles from './NavBar.module.scss';

import UserInfo from './users/UserInfo';

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
        <Menu.Item position="right">
          <UserInfo />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
