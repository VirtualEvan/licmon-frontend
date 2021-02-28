import {combineReducers} from 'redux';

import status from './status';
import auth from './auth';
import notification from './notification';

export default combineReducers({
  auth,
  status,
  notification,
});
