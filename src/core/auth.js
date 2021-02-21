import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {userLogout, userLogin, loginWindowOpened} from '../actions/auth';
import {getToken} from './selectors';

export function useAuthentication() {
  const popup = useRef(null);
  const dispatch = useDispatch();

  const login = () => {
    const width = window.outerWidth * 0.5;
    const height = window.outerHeight * 0.7;
    if (popup.current) {
      popup.current.close();
    }
    popup.current = window.open(
      'auth/login',
      'login',
      `menubar=no,toolbar=no,location=no,dependent=yes,width=${width},height=${height}`
    );
    dispatch(loginWindowOpened());
  };

  const logout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    const handleMessage = evt => {
      if (evt.source !== popup.current) {
        // ignore the message if it wasn't from our popup. this happens e.g. when this
        // hook is used in multiple places at the same time.
        return;
      }
      // TODO: Remove this hardcoded stuff
      if (evt.origin !== window.location.origin) {
        // we should never get messages from different origins, so those are ignored too
        console.error(
          `Unexpected message origin: expected ${window.location.origin}, got ${evt.origin}`
        );
        return;
      }
      if (evt.data.error) {
        console.warn(`Login failed: ${evt.data.error}`);
        return;
      }
      if (evt.data.token) {
        dispatch(userLogin(evt.data.token));
      }
    };

    const closePopup = () => {
      if (popup.current) {
        popup.current.close();
        popup.current = null;
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('unload', closePopup);

    return () => {
      window.removeEventListener('unload', closePopup);
      window.removeEventListener('message', handleMessage);
      closePopup();
    };
  }, [dispatch]);

  return {login, logout};
}

export function checkInitialToken(store) {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Found initial token in local storage');
    store.dispatch(userLogin(token));
  }
}

export function subscribeTokenChanges(store) {
  store.subscribe(() => {
    const token = getToken(store.getState());
    if (localStorage.getItem('token') === token) {
      return;
    }
    if (token) {
      console.log('Saving token in local storage');
      localStorage.setItem('token', token);
    } else {
      console.log('Removing token from local storage');
      localStorage.removeItem('token');
    }
  });
}
