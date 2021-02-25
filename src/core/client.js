import {useReducer, useEffect} from 'react';
import {getToken, isAcquiringToken} from './selectors';
import {tokenExpired, tokenNeeded} from '../actions/auth';
import {addErrorNotification} from '../actions/notification';

function backendReducer(state, action) {
  switch (action.type) {
    case 'submit':
      return {...state, submitting: true, error: '', result: null};
    case 'error':
      return {...state, submitting: false, error: action.error};
    case 'success':
      return {...state, submitting: false, result: action.result};
    default:
      return state;
  }
}

class ClientError extends Error {
  constructor(url, code, message, data = null) {
    if (code) {
      super(`Request to ${url} failed (${code}): ${message}`);
    } else {
      super(`Request to ${url} failed: ${message}`);
    }
    this.data = data;
  }
}

class Client {
  store = null;

  async catchErrors(promise) {
    try {
      return await promise;
    } catch (err) {
      this.store.dispatch(addErrorNotification(err.toString()));
      return undefined;
    }
  }

  get token() {
    if (!this.store) {
      throw new Error('Tried to use client that is not connected to a store');
    }
    return getToken(this.store.getState());
  }

  /**
   * This method returns a React hook which handles the possible states regarding backend
   * communication. 
   *
   * @param {Function} funcs - the client function which will be invoked.
   */
  useBackendLazy(func) {
    const [state, dispatch] = useReducer(backendReducer, {
      submitting: false,
      error: '',
      result: null,
    });

    const call = async (...params) => {
      dispatch({type: 'submit'});
      try {
        const result = await func.bind(this)(...params);
        dispatch({type: 'success', result});
        return result;
      } catch (err) {
        dispatch({type: 'error', error: err.toString()});
        this.store.dispatch(addErrorNotification(err.message));
      }
    };

    return [call, state.submitting, state.error, state.result];
  }

  /**
   * `useBackendLazy` works fine for methods that are invoked manually (e.g. clicking a button) but may cause problems
   * when used in conjunction with `useEffect` which relies on the identity of its dependencies. `useBackend` solves
   * this problem by calling the passed `func` immediatelly and returning relevant data.
   *
   * @param {Function} func - function that will be called every time `deps` change.
   * @param {Array} deps - dependencies passed to the `useEffect`.
   */
  useBackend(func, deps=[]) {
    const [state, dispatch] = useReducer(backendReducer, {
      submitting: false,
      error: '',
      result: null,
    });

    useEffect(() => {
      (async () => {
        try {
          const result = await func();
          dispatch({type: 'success', result});
        } catch (err) {
          dispatch({type: 'error', error: err.toString()});
          this.store.dispatch(addErrorNotification(err.message));
        }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return [state.result, state.submitting, state.error];
  }

  async request(url, options = {}, isRetry = false) {
    const {headers = {Accept: 'application/json'}, anonymous = false, ...fetchOptions} = options;
    let token = this.token;
    if (!anonymous) {
      if (!token) {
        console.log('Cannot send authenticated request without being logged in');
        await this._acquireToken();
        token = this.token;
        if (!token) {
          throw new ClientError(url, 0, 'Not logged in');
        }
        console.log('We got a token; continuing request');
      }
      headers.Authorization = `Bearer ${token}`;
    }

    let resp;
    try {
      resp = await fetch(url, {headers, ...fetchOptions});
    } catch (e) {
      throw new ClientError(url, 0, e);
    }

    let data;
    try {
      data = resp.status === 204 ? '' : await resp.json();
    } catch (e) {
      throw new ClientError(url, resp.status, `Invalid response (${e})`);
    }

    if (resp.redirected) {
      window.location.href = resp.url;
    }

    if (resp.ok) {
      return data;
    }

    if (['token_expired', 'token_invalid'].includes(data.error) && !isRetry) {
      console.log(`Request failed due to invalid token (${data.error})`);
      await this._acquireToken(true);
      if (this.token) {
        console.log('We got a new token; retrying request');
        return await this.request(url, options, true);
      } else {
        console.log('Logued out during retry. Aborting');
      }
    }
    throw new ClientError(url, resp.status, data.error || 'Unknown Error!', data);
  }

  async _acquireToken(expired = false) {
    // dispatching tokenExpired will show a prompt about the expire session asking
    // the user to login again (or logout)
    if (!isAcquiringToken(this.store.getState())) {
      if (expired) {
        console.log('Asking user to login again');
        this.store.dispatch(tokenExpired());
      } else {
        console.log('Asking user to login');
        this.store.dispatch(tokenNeeded());
      }
    } else {
      console.log('Waiting for login from other refresh request');
    }
    let unsubscribe;
    await new Promise(resolve => {
      // subscribe to the store and wait until the refreshing flag we set through
      // the dispatch above has been reset. this happens only after a successful
      // login or logout
      unsubscribe = this.store.subscribe(() => {
        if (!isAcquiringToken(this.store.getState())) {
          console.log('Left refresh mode');
          resolve();
        }
      });
    });
    // once we're here the user has logged in or logged out
    unsubscribe();
  }
}

export default new Client();
