import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './components/Other/NavBar'; 
import LoginPage from './components/Views/LoginPage';
import Welcome from './components/Views/Welcome';
import Dashboard from './components/Views/Dashboard';
import SignupForm from './components/Views/SignupPage';

import './App.scss';

function App({username}) {
  return (
    <div className="app-main-container">
      <Route path="/" component={NavBar} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupForm} />
      {!username && <Route exact path="/" component={Welcome} />}
      {username && <Route exact path="/" component={Dashboard} />}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username
  }
};

export default connect(mapStateToProps, {})(App);
