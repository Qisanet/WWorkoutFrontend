// src/App.jsx

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WorkForm from './components/WorkoutForm';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/createpage' element={<WorkForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;