import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStoreActions } from 'easy-peasy'; 
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';

import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Login from './pages/Login';
import CreateSchoolOpeningUpdates from './pages/CreateSchoolOpeningUpdates';
import Profile from './pages/ProfileView';
import PasswordForgot from './pages/PasswordForgot';
import NotFound from './pages/NotFound';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolOpening from './pages/SchoolOpening/SchoolOpening';
import jwt_decode from 'jwt-decode';

function App() {

  let userLogin = useStoreActions(actions => actions.userLogin);
  const [userData, setUserData] = useState({});

  useEffect(() => {

      async function fetchUserInfo() {
        const token = localStorage.getItem('jwt_token');
        const user_id = jwt_decode(token).payload.user_id;
        const resp = await axios.get(`https://teachiate-backend.fnmotivations.com/users/${user_id}/profile`);

        if(resp.data.success === true) {
          setUserData(resp.data.data);
        }
      };      

      if(localStorage.getItem('jwt_token') !== null)  {
        userLogin();
        fetchUserInfo();
      }  
  }, []);  

  return (
      <Router>    
          <Header userData={userData}/>  
          <div id="main">
            <Switch>
              <Route path="/" exact><Home userData={userData}/></Route>
              <PrivateRoute path='/my-profile' userData={userData} component={Profile}/>
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
              <PrivateRoute path='/create-covid-post' component={CreateSchoolOpeningUpdates}/>              
              <Route path='*' exact={true} component={NotFound}></Route>
             </Switch>
          </div>
          <Footer/>
      </Router>
  );
}

export default App;
