import {
  ADD_SUCCESS_NOTIFICATION,
  ADD_WARNING_NOTIFICATION,
  ADD_ERROR_NOTIFICATION,
  ADD_INFO_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
} from '../actions/notification';

const notification = (state = [], action) => {
  const genId = () => (state.length !== 0 ? state[state.length - 1].id + 1 : 0);
  switch (action.type) {
    case ADD_SUCCESS_NOTIFICATION: {
      return [...state, {id: genId(), message: action.message, type: 'success'}];
    }
    case ADD_WARNING_NOTIFICATION: {
      return [...state, {id: genId(), message: action.message, type: 'warning'}];
    }
    case ADD_ERROR_NOTIFICATION: {
      return [...state, {id: genId(), message: action.message, type: 'error'}];
    }
    case ADD_INFO_NOTIFICATION: {
      return [...state, {id: genId(), message: action.message, type: 'info'}];
    }
    case REMOVE_NOTIFICATION:
      return state.filter(notif => notif.id !== action.id);
    case CLEAR_NOTIFICATIONS:
      return [];
    default:
      return state;
  }
};

export default notification;
