import React from 'react';
import ReactDOM from 'react-dom';
import { logger } from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import AuthStoreProvider from './Store/AuthStore';
import App from './App';
import reducers from './redux/reducers'
import sagas from './redux/sagas'
import createSagaMiddleware from 'redux-saga'
import * as serviceWorker from './serviceWorker';
import awsconfig from './aws-exports.js'
import Amplify from 'aws-amplify';
Amplify.configure(awsconfig)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(reducers(), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <AuthStoreProvider>
      <App />
    </AuthStoreProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
