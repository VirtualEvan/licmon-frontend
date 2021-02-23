import {combineReducers} from 'redux';

import status from './status';
import auth from './auth';
import user from './user';
import notification from './notification';

export default combineReducers({
  user,
  auth,
  status,
  notification,
});
