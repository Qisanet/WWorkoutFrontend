// src/App.jsx


import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WorkoutForm from './components/WorkoutFOrm';



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/createpage' element={<WorkoutForm />} />
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