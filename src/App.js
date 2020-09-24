import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStoreActions } from 'easy-peasy'; 
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Login from './pages/Login';
import CreateSchoolOpeningUpdates from './pages/CreateSchoolOpeningUpdates';
import Profile from './pages/ProfileView';
import PasswordForgot from './pages/PasswordForgot';
import Forum from './pages/Forum';
import ForumCreatePost from './pages/CreateForumPost';
import SingleForumPost from './pages/SingleForumPost';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolOpening from './pages/SchoolOpening/SchoolOpening';

function App() {
  let userLogin = useStoreActions(actions => actions.userLogin);

  useEffect(() => {
      if(localStorage.getItem('jwt_token'))  {
        userLogin();
      }  
  }, []);  

  return (
      <Router>    
          <Header/>  
          <div id="main">
            <Switch>
              <Route path="/" exact><Home/></Route>
              <PrivateRoute path='/my-profile' component={Profile}/>
              <Route path="/about">
                <About />
              </Route> 
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>         
              <Route path="/forgot-password">
                <PasswordForgot/>
              </Route>
              <Route path="/groups">
                <Groups />
              </Route>
              <Route path="/opening-school-in-covid-siutation">
                <SchoolOpening/>
              </Route>
              <PrivateRoute path="/forum-create-post" component={ForumCreatePost}/>
              <Route exact path="/forum">
                  <Forum/>
              </Route>
              <Route path="/forum/:id">
                <SingleForumPost/>
              </Route>
              <PrivateRoute path='/create-covid-post' component={CreateSchoolOpeningUpdates}/>              
             </Switch>
          </div>
          <Footer/>
      </Router>
  );
}

export default App;
