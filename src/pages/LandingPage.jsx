import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const LandingPage = () => {
  return (
    <div className="container-fluid">
    <div className="row g-0 vw-100 vh-100">
   
      <div className="col-lg-8 col-md-6 col-sm-12 bg-danger text-white d-flex justify-content-center align-items-center">
      <img src="/AuthImage.jpg" alt="Gym-Log" className="img-fluid" />

      </div>
  
     
      <div className="col-lg-4 col-md-6 col-sm-12 bg-warning d-flex flex-column justify-content-center align-items-center text-center">
        <div>
          <h1 className="mb-4 text-dark">Welcome to Gym-Log</h1>
          <p className="lead">Your personal fitness tracking app</p>
          <div>
            <Link to="/signup" className="btn btn-primary m-2 px-5 ">Sign Up</Link>
            <Link to="/login" className="btn btn-secondary m-2 px-5">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default LandingPage;