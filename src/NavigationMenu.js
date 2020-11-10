import React, {useState, useEffect} from 'react';
import {Menu, Divider} from 'semantic-ui-react';

export default function NavigationMenu() {
  return (
    <Menu vertical borderless fluid text>
      <Menu.Item active as="a">
        Dashboard
      </Menu.Item>
      <Menu.Item as="a">Raw data</Menu.Item>
      <Menu.Item as="a">Service overview</Menu.Item>
      <Menu.Item as="a">User permissions</Menu.Item>
    </Menu>
  );
}
