import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getToken, getUserInfo} from '../../core/selectors';
import {loadUser} from '../../actions/auth';
import {useAuthentication} from '../../core/auth';

export default function UsersPage() {
  const user = useSelector(getUserInfo);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const {login, logout} = useAuthentication();
  return (
    <>
      <button onClick={() => login()}>Login</button>

      <button onClick={() => logout()}>Logout</button>

      <button onClick={() => dispatch(loadUser())}>Get User</button>

      <p>User: {user && user.roles}</p>
      <p>Token: {token}</p>
    </>
  );
}
