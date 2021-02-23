export const ADD_SUCCESS_NOTIFICATION = 'Add success notification';
export const ADD_WARNING_NOTIFICATION = 'Add warning notification';
export const ADD_ERROR_NOTIFICATION = 'Add error notification';
export const ADD_INFO_NOTIFICATION = 'Add info notification';
export const REMOVE_NOTIFICATION = 'Remove notification';
export const CLEAR_NOTIFICATIONS = 'Clear all the notifications';

export function addSuccessNotification(message) {
  return {type: ADD_SUCCESS_NOTIFICATION, message};
}

export function addWarningNotification(message) {
  return {type: ADD_WARNING_NOTIFICATION, message};
}

export function addErrorNotification(message) {
  return {type: ADD_ERROR_NOTIFICATION, message};
}

export function addInfoNotification(message) {
  return {type: ADD_INFO_NOTIFICATION, message};
}

export function removeNotification(notificationId) {
  return {type: REMOVE_NOTIFICATION, id: notificationId};
}

export function clearNotifications() {
  return {type: CLEAR_NOTIFICATIONS};
}
