// notifications
export const getNotifications = state => state.notification;

// auth
export const getToken = state => state.auth.token;
export const isLoginWindowOpen = state => state.auth.loginWindowOpen;
export const isLoggedIn = state => !!state.auth.token;
export const isAcquiringToken = state => !!state.auth.acquiringToken;
export const adminView = state => state.auth.adminView;

// auth.user
export const getUserInfo = state => state.auth.user;
export const getUserRoles = state => state.auth.user.roles;
