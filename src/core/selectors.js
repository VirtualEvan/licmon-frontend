// notifications
export const getNotifications = state => state.notification;

// auth
export const getToken = state => state.auth.token;
export const isLoginWindowOpen = state => state.auth.loginWindowOpen;
export const isLoggedIn = state => !!state.auth.token;
export const isAcquiringToken = state => !!state.auth.acquiringToken;

// user
export const getUserInfo = state => state.user;
export const getUserRoles = state => state.user.roles;
