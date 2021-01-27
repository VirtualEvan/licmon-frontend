import {combineReducers} from 'redux';

import status from './status';
import auth from './auth';
import user from './user';

export default combineReducers({
  user,
  auth,
  status,
});
