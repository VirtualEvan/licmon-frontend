import client from '../core/client';
import {getCurrentUser} from '../services/user';

export const USER_RECEIVED = 'User info received';

export function loadUser() {
  return async dispatch => {
    const user = await client.catchErrors(getCurrentUser());
    if (user !== undefined) {
      dispatch({type: USER_RECEIVED, user});
    }
    return user;
  };
}
