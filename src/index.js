import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, createStore, action } from 'easy-peasy';

import App from './App';
import * as serviceWorker from './serviceWorker';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAq21v3iUjf6Syn255MAx5iqmqW33x9FF4",
  authDomain: "teachiate.firebaseapp.com",
  databaseURL: "https://teachiate.firebaseio.com",
  projectId: "teachiate",
  storageBucket: "teachiate.appspot.com",
  messagingSenderId: "711125380868",
  appId: "1:711125380868:web:845ce50784a98ba2e3ea51",
  measurementId: "G-X65026C31Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


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
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
