import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './utils';
import { connect } from 'react-redux';

import NavBar from './components/Other/NavBar'; 
import LoginPage from './components/Views/LoginPage';
import Welcome from './components/Views/Welcome';
import Dashboard from './components/Views/Dashboard';
import SignupForm from './components/Views/SignupPage';
import LogOut from './components/Other/LogOut';
import EventForm from './components/Forms/EventForm';
import EventInfo from './components/Views/EventInfo';
import EditEvent from './components/Forms/EditEvent';

import './App.scss';
import { statement } from '@babel/template';

function App({username, error, loaded}) {
  
  return (
    <div className="app-main-container">
      <Route path="/" component={NavBar} />
      {/* <EventForm /> */}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/logout" component={LogOut} />
      {loaded && error && <p>{error}</p>}
      {!username && <Route exact path="/" component={Welcome} />}
      {username && <Route exact path="/" component={Dashboard} />}
      <PrivateRoute exact path="/events/:event_id" component={EventInfo} />
      <PrivateRoute path="/events/:event_id/edit" component={EditEvent} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username,
    error: state.error,
    loaded: state.loaded
  }
};

export default connect(mapStateToProps, {})(App);
