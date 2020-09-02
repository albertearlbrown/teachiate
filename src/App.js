import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Groups from './pages/Groups';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
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
            <Route path="/register">
              <Register/>
            </Route>         
            <Route path="/groups">
              <Groups />
            </Route>
          </Switch>
        </div>
        <Footer/>
    </Router>
  );
}

export default App;
