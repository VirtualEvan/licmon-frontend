import React from 'react';
import {Menu} from 'semantic-ui-react';
import {useHistory} from 'react-router';

import UserInfo from './users/UserInfo';

export default function NavigationMenu() {
  const history = useHistory();

  return (
    <>
      <UserInfo />
      <Menu vertical borderless fluid text>
        <Menu.Item
          as="a"
          onClick={() => {
            history.push('/');
          }}
          active
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => {
            history.push('/');
          }}
        >
          Raw data
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
      </Menu>
    </>
  );
}
