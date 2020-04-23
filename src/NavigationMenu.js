import React, { useState, useEffect } from 'react';
import { Menu, Divider } from 'semantic-ui-react'

export default function NavigationMenu() {

  return (
    <Menu vertical borderless fluid text>
      <Menu.Item active as="a">
        Dashboard
      </Menu.Item>
      <Menu.Item as="a">Option 1</Menu.Item>
      <Menu.Item as="a">Option 2</Menu.Item>
      <Menu.Item as="a">Option 3</Menu.Item>
      <Divider hidden />
      <Menu.Item as="a">Option 4</Menu.Item>
      <Menu.Item as="a">Option 5</Menu.Item>
      <Menu.Item as="a">Option 6</Menu.Item>
      <Menu.Item as="a">Option 7</Menu.Item>
      <Menu.Item as="a">Option 8</Menu.Item>
      <Divider hidden />
      <Menu.Item as="a">Option 9</Menu.Item>
      <Menu.Item as="a">Option 10</Menu.Item>
      <Menu.Item as="a">Option 11</Menu.Item>
    </Menu>
  );

}