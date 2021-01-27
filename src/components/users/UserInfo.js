import React from 'react';
import {Button, Label, Icon} from 'semantic-ui-react';

import {useAuthentication} from '../../core/auth';
import {getUserInfo} from '../../core/selectors';
import {useSelector} from 'react-redux';

export default function UserInfo() {
  const user = useSelector(getUserInfo);
  const {login, logout} = useAuthentication();

  const values = user
    ? {
        text: user.name,
        icon: 'sign-out',
        onClick: logout,
      }
    : {
        text: 'Log in',
        icon: 'key',
        onClick: login,
      };

  return (
    <Button as="div" labelPosition="left">
      <Label basic>{values.text}</Label>
      <Button icon onClick={() => values.onClick()}>
        <Icon name={values.icon} />
      </Button>
    </Button>
  );
}
