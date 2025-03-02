import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const loggedInUser = res.data.user;
      // Redirect based on role using dedicated landing pages
      if (loggedInUser._id === "ADMIN123") {
        navigate("/admin-landing");
      } else if (loggedInUser.role === "owner") {
        navigate("/owner-landing");
      } else {
        navigate("/user-landing");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-container">
          <h2>Welcome Back</h2>
          <p>Please log in to continue</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          <div className="login-links">
            <a href="/register">Don't have an account? Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
