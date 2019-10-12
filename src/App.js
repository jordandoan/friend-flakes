import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './components/Other/NavBar'; 
import LoginPage from './components/Views/LoginPage';
import Welcome from './components/Views/Welcome';
import Dashboard from './components/Views/Dashboard';
import SignupForm from './components/Views/SignupPage';

import './App.scss';

function App() {
  let show = false;
  return (
    <div className="app-main-container">
      <Route path="/" component={NavBar} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupForm} />
      {show && <Route exact path="/" component={Welcome} />}
      {!show && <Route exact path="/" component={Dashboard} />}
    </div>
  );
}

export default App;
