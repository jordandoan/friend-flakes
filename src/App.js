import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './components/Other/NavBar'; 
import LoginPage from './components/Views/LoginPage';

import './App.scss';

function App() {
  return (
    <div className="app-main-container">
      <Route path="/" component={NavBar} />
      <Route path="/login" component={LoginPage} />
    </div>
  );
}

export default App;
