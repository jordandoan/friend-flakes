import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './utils';
import { connect } from 'react-redux';

import NavBar from './components/Other/NavBar'; 
import LoginPage from './components/Views/LoginPage';
import Welcome from './components/Views/Welcome';
import Dashboard from './components/Views/Dashboard';
import SignupForm from './components/Views/SignupPage';
import LogOut from './components/Other/LogOut';
import EventInfo from './components/Views/EventInfo';
import EditEvent from './components/Forms/EditEvent';

import './App.scss';

function App({ username, error }) {
  console.log(username);
  return (
    <div className="app-main-container">
      <Route path="/" component={NavBar} />
      {/* <EventForm /> */}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/logout" component={LogOut} />
      {error && <p>{error}</p>}
      {username && <Route exact path="/" component={Dashboard} />}
      {!username && <Route exact path="/" component={Welcome} />}
      <Route path="/dashboard" component={ props => <Redirect to="/"/> } />
      <PrivateRoute exact path="/events/:event_id" component={EventInfo} />
      <PrivateRoute path="/events/:event_id/edit" component={EditEvent} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username,
    error: state.error,
  }
};

export default connect(mapStateToProps, {})(App);
