import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './components/Other/NavBar'; 

import './App.scss';

function App() {
  return (
    <div className="app-main-container">
      <Route path="/" component={NavBar} />
    </div>
  );
}

export default App;
