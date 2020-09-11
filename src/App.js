import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy'; 

import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Login from './pages/Login';
import CreateSchoolOpeningUpdates from './pages/CreateSchoolOpeningUpdates';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolOpening from './pages/SchoolOpening/SchoolOpening';
import PrivateRoute from './components/PrivateRoute';

function App() {

  let islogin = useStoreState(state => state.islogin);
  let userLogin = useStoreActions(actions => actions.userLogin);
  
  useEffect(() => {
      if(localStorage.getItem('jwt_token') !== null)  {
        userLogin();
      }  
  });  

  return (
      <Router>
          <Header />
          <div id="main">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
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
              <PrivateRoute path='/create-post' component={CreateSchoolOpeningUpdates}/>              
             </Switch>
          </div>
          <Footer/>
      </Router>
  );
}

export default App;
