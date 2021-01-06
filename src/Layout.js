import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { AuthStoreContext } from './Store/AuthStore';

import AdminLayout from "./adminComponents/AdminLayout/AdminLayout";
import UserLayout from "./App";

function Layout() {

  return (
    <Router>
      <Switch>
        <UserRoute exact path='/' component={UserLayout} />
        <UserRoute exact path='/about' component={UserLayout} />
        <UserRoute exact path='/login' component={UserLayout} />
        <UserRoute exact path='/register' component={UserLayout} />
        <UserRoute exact path='/forgot-password' component={UserLayout} />
        <UserRoute exact path='/groups' component={UserLayout} />
        <UserRoute exact path='/people' component={UserLayout} />
        <UserRoute exact path='/opening-school-in-covid-siutation' component={UserLayout} />
        <UserRoute exact path='/forum-create-post' component={UserLayout} />
        <UserRoute exact path='/forum' component={UserLayout} />
        <UserRoute exact path='/search' component={UserLayout} />
        <UserRoute exact path='/forum/:id' component={UserLayout} />
        <UserRoute exact path='/create-group-step-1' component={UserLayout} />
        <UserRoute exact path='/create-group-step-2' component={UserLayout} />
        <UserRoute exact path='/notifications' component={UserLayout} />
        <UserRoute exact path='/create-school-updates' component={UserLayout} />
        <UserRoute exact path='/posts/:id' component={UserLayout} />

        <AdminRoute path='/admin' component={AdminLayout} />
      </Switch>
    </Router>
  );

  function UserRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => React.createElement(component, props)}
      />
    );
  }


  function AdminRoute({ component, ...rest }) {
    const { isAuthenicate } = useContext(AuthStoreContext); // if authed by admin
    return (
      <Route
        {...rest}
        render={props =>
          //isAuthenicate ? (
          React.createElement(component, props)
          // ) : (
          //     <Redirect
          //       to={{
          //         pathname: "/login",
          //         state: {
          //           from: props.location,
          //         },
          //       }}
          //     />
          //   )
        }
      />
    );
  }
}

export default Layout;
