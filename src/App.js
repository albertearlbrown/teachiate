import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy'; 
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';
import { StoreProvider, createStore, action } from 'easy-peasy';

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
import People from './pages/People';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolOpening from './pages/SchoolOpening/SchoolOpening';

import { AuthStoreContext } from './Store/AuthStore';

function App () {

  const { isAuthenicate, setIsAuthenicate, userData, setUserData } = useContext(AuthStoreContext);

  useEffect(() => {    

    async function fetchUser() {
      const config = {
        headers: {
          Authorization: 'Bearer '+localStorage.getItem('jwt_token')
        }
      };
      
      axios.get('https://teachiate-backend.fnmotivations.com/users/me', config)
      .then((res) => {
        if(res.data.success === true) {
          setUserData(res.data.data);
          setIsAuthenicate(true);
        }
      })     
    } 

    if(localStorage.getItem('jwt_token')) {
      fetchUser();      
    }
  }, []);



  return (
      <Router>    
          <Header/>  
          <div id="main">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
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
              <Route path="/people">
                <People/>
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
