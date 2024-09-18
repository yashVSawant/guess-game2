import React from 'react';
import classes from './App.module.css'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Logout from './components/Auth/Logout';
import Leaderboard from './components/Leaderboard/Leaderboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import StartGame from './components/GuessNumber/StartGame';
import GuessNumber from './components/GuessNumber/GuessNumber';
import { AuthProvider } from './components/Auth/AuthContext';

function App() {

  return (
    <div className={classes.full}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/game/:id" element={<GuessNumber />} />
            <Route path="/" element={<PrivateRoute element={<StartGame/>}/>} /> 
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
