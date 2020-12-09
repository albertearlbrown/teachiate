import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

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
import GroupStep1 from './pages/Group/Step1';
import GroupStep2 from './pages/Group/Step2';
import Notifications from './pages/NotificationsList/Notifications'
import ForumPostPage from './pages/ForumPostPage/ForumPostPage'

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolOpening from './pages/SchoolOpening/SchoolOpening';

// utils
import { AuthStoreContext } from './Store/AuthStore';
import Search from './pages/Search/Search';

import { Auth, Hub } from 'aws-amplify';
import LandingPage from './components/LandingPage/LandingPage';

function App () {


  const { setIsAuthenicate, setUserData } = useContext(AuthStoreContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser()
          break;
        case 'signOut':
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => {
        axios({
          method: 'post',
          url:'/auth/social',
          data:{
            ...userData.attributes
          }
        }).then(()=>{
          fetchUser()
        })
      })
      .catch(() => console.log('Not signed in'));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    setLoading(true)
    Auth.currentAuthenticatedUser()
      .then(userData => {
        axios.get('/users/me')
        .then((res) => {
          if(res.data.data) {
            setUserData(res.data.data);
            setUser(res.data.data)
            setIsAuthenicate(true);
          }
          setLoading(false)
        }).catch(()=>{
          setLoading(false)
        })
      })
      .catch(() => {
        setLoading(false)
        console.log('Not signed in')});
  }

  return (
      <Router>
          {window.location.pathname!=='/' && <Header/>}
          {loading
            ?
            <div style={{height:700}}>
            <Backdrop open={true}>
              <CircularProgress style={{width: 250, height: 250}} color="inherit" />
            </Backdrop>
            </div>
            :
            <div id="main">
              <Switch>
                <Route path="/" exact>
                  <LandingPage />
                </Route>
                <Route path="/index" exact>
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
                <Route path="/search-result">
                  <Search/>
                </Route>
                <Route path="/forum/:id">
                  <SingleForumPost/>
                </Route>
                <Route path="/create-group-step-1">
                  <GroupStep1/>
                </Route>
                <Route path="/create-group-step-2">
                  <GroupStep2/>
                </Route>
                <PrivateRoute path='/notifications' component={Notifications}/>
                <PrivateRoute path='/create-school-updates' component={CreateSchoolOpeningUpdates}/>
                <PrivateRoute path='/posts/:id' component={ForumPostPage}/>
              </Switch>
            </div>
          }
          {window.location.pathname!=='/' && <Footer/>}
      </Router>
  );
}

export default App;
