import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// adminPages
import User from "../../adminPages/User";
import Post from "../../adminPages/Post";
import Forum from "../../adminPages/Forum";
import Group from "../../adminPages/Group";


// context
import { useLayoutState } from "../../context/LayoutContext";

function AdminLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>

            <Route path="/admin/user" component={User} />
            <Route path="/admin/post" component={Post} />
            <Route path="/admin/group" component={Group} />
            <Route path="/admin/forum" component={Forum} />

          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(AdminLayout);
