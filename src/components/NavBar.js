import React from 'react';
import {Menu, Dropdown, Container} from 'semantic-ui-react';
import {useHistory} from 'react-router';
import styles from './NavBar.module.scss';

import UserInfo from './users/UserInfo';

export default function NavigationMenu() {
  const history = useHistory();

  return (
    <Menu inverted className={styles.navbar}>
      <Container>
        <Menu.Item
          as="a"
          header
          onClick={() => {
            history.push('/');
          }}
        >
          Licmon
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => {
            history.push('/service');
          }}
        >
          Service overview
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => {
            history.push('/users');
          }}
        >
          User management
        </Menu.Item>
        <Menu.Item as="a">Home</Menu.Item>

        <Dropdown item simple text="Dropdown">
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className="dropdown icon" />
              <span className="text">Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <UserInfo />
      </Container>
    </Menu>
  );
}
