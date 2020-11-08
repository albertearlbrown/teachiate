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

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolOpening from './pages/SchoolOpening/SchoolOpening';

import { AuthStoreContext } from './Store/AuthStore';
import Search from './pages/Search/Search';

axios.defaults.baseURL = 'https://teachiate-backend.fnmotivations.com';

function App () {

  const { isAuthenicate, setIsAuthenicate, userData, setUserData } = useContext(AuthStoreContext);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchUser() {
      const config = {
        headers: {
          Authorization: 'Bearer '+localStorage.getItem('jwt_token')
        }
      };

      axios.get('http://localhost:4000/users/me', config)
      .then((res) => {
        if(res.data.success === true) {
          setUserData(res.data.data);
          setIsAuthenicate(true);
        }
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      })
    }

    if(localStorage.getItem('jwt_token')) {
      fetchUser();
    }else{
      setLoading(false)
    }
  }, []);



  return (
      <Router>
          <Header/>
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
                <PrivateRoute path='/create-school-updates' component={CreateSchoolOpeningUpdates}/>
              </Switch>
            </div>
          }
          <Footer/>
      </Router>
  );
}

export default App;
