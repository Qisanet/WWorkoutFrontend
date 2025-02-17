import React, { useState, useContext } from "react";
import axios from "axios";
import BackArrow from "../components/BackArrow";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    console.log("Sending data:", userData);

    try {
      const response = await axios.post("https://backend-workout-4w4a.onrender.com/api/auth/login", userData);
      const { email, token } = response.data;
      setUser({ email, token });

      
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);

      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/createpage"); 
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <>
      <BackArrow />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="col-md-12 p-4 rounded shadow-lg" style={{ backgroundColor: "#f8f9fa" }}>
          <form onSubmit={handleLogin}>
            <h2 className="text-center mb-4 text-primary">Log In</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                value={email}
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Log In</button>
            <p className="mx-4">Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;