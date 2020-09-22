import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy'; 
import axios from 'axios';

import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Login from './pages/Login';
import CreateSchoolOpeningUpdates from './pages/CreateSchoolOpeningUpdates';
import Profile from './pages/ProfileView';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolOpening from './pages/SchoolOpening/SchoolOpening';
import PrivateRoute from './components/PrivateRoute';

function App() {

  let userLogin = useStoreActions(actions => actions.userLogin);
  const [userData, setUserData] = useState({});
  const [loadUserData, setloadUserData] = useState(false);

  useEffect(() => {

      async function fetchUserInfo() {
        const token = localStorage.getItem('jwt_token');

        const resp = await axios.post('https://teachiate-backend.fnmotivations.com/users/profile', {}, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });

        if(resp.data.success === true) {
          setUserData(resp.data.data);
          setloadUserData(true);
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
              <Route path="/"  exact><Home userData={userData}/></Route>
              <Route path='/my-profile'><Profile userData={userData}/></Route>
              <Route path="/about">
                <About />
              </Route> 
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>         
              <Route path="/groups">
                <Groups />
              </Route>
              <Route path="/opening-school-in-covid-siutation">
                <SchoolOpening/>
              </Route>
              <PrivateRoute path='/create-covid-post' component={CreateSchoolOpeningUpdates}/>              
             </Switch>
          </div>
          <Footer/>
      </Router>
  );
}

export default App;
