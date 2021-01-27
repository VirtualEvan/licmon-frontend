import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import {checkInitialToken, subscribeTokenChanges} from './core/auth';
import * as serviceWorker from './serviceWorker';
import store from './core/store';
import client from './core/client';

client.store = store;
checkInitialToken(store);
subscribeTokenChanges(store);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
