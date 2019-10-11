import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './components/Other/NavBar'; 
import LoginPage from './components/Views/LoginPage';
import Welcome from './components/Views/Welcome';
import Dashboard from './components/Views/Dashboard';

import './App.scss';

function App() {
  let show = true;
  return (
    <div className="app-main-container">
      <Route path="/" component={NavBar} />
      <Route path="/login" component={LoginPage} />
      {show && <Route exact path="/" component={Welcome} />}
      {!show && <Route exact path="/" component={Dashboard} />}
    </div>
  );
}

export default App;
