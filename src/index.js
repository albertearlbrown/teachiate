import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, createStore, action } from 'easy-peasy';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore({
  islogin: false,
  userLogin: action((state) => {
    state.islogin = true;
  }),
  userLogout: action((state) => {
    state.islogin = false;
  })
});

ReactDOM.render(
  <StoreProvider store={store}>
      <App />
  </StoreProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
