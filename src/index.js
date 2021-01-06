import React from 'react';
import ReactDOM from 'react-dom';
import AuthStoreProvider from './Store/AuthStore';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Themes from "./themes";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import Layout from './Layout';
import * as serviceWorker from './serviceWorker';
import awsconfig from './aws-exports.js'
import Amplify from 'aws-amplify';
Amplify.configure(awsconfig)

ReactDOM.render(
  <AuthStoreProvider>
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <Layout />
        </ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  </AuthStoreProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
