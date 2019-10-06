import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './components/NavBar'; 

import './App.scss';

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
    </div>
  );
}

export default App;
