import {getToken, isAcquiringToken} from './selectors';
import {tokenExpired, tokenNeeded, addError} from '../actions/auth';

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
      this.store.dispatch(addError(err.toString()));
      return undefined;
    }
  }

  get token() {
    if (!this.store) {
      throw new Error('Tried to use client that is not connected to a store');
    }
    return getToken(this.store.getState());
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
