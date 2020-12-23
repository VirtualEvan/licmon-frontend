import React from 'react';
import {Menu} from 'semantic-ui-react';

export default function NavigationMenu() {
  return (
    <Menu vertical borderless fluid text>
      <Menu.Item as="a" href="/" active>
        Dashboard
      </Menu.Item>
      <Menu.Item as="a" href="/">
        Raw data
      </Menu.Item>
      <Menu.Item as="a" href="/service">
        Service overview
      </Menu.Item>
      <Menu.Item as="a" href="/users">
        User management
      </Menu.Item>
    </Menu>
  );
}
