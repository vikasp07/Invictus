import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <h1 className="landing-title">Welcome to RideShare</h1>
      <p className="landing-subtitle">
        Your convenient ride sharing solution in Mumbai.
      </p>
      <div className="landing-buttons">
        <Link to="/login" className="btn">
          Login
        </Link>
        <Link to="/register" className="btn">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
