import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../components/BackArrow";

const Signup =  () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = () => {
    if (!username || !email || !password) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return;
      
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      enqueueSnackbar("Invalid email format", { variant: "warning" });
      return;
    }
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return;
      
    }

    axios
      .post("https://backend-workout-4w4a.onrender.com/api/auth/signup", { username, email, password })
      .then(() => {
        enqueueSnackbar("Signup successful! Please check your email to verify your account", { variant: "success" });
        navigate("/");
        
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data?.message || "An error occurred", { variant: "error" });
      });
  };

  return (
    <>
      <BackArrow />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="col-md-12 p-5 rounded shadow-lg" style={{ backgroundColor: "#f8f9fa" }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
            <h2 className="text-center mb-4 text-primary">Signup</h2>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                value={username}
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Signup</button>
            <p className="mx-4">Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;