import {USER_LOGOUT} from '../actions/auth';
import {USER_RECEIVED} from '../actions/user';

const user = (state = null, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return null;
    case USER_RECEIVED:
      return action.user;
    default:
      return state;
  }
};

export default user;
