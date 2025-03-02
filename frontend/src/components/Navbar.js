import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">RideShare</h2>
      <div className="nav-links">
        {user ? (
          <>
            {user.role === "user" ? (
              <>
                <Link to="/rides">Book Ride</Link>
                <Link to="/create">Create Ride</Link>
              </>
            ) : (
              <Link to="/owner">Owner Dashboard</Link>
            )}
            <Link to="/map">Track Ride</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/sos">SOS</Link>
            {user._id === "ADMIN123" && <Link to="/admin">Admin</Link>}
            <Link
              to="/logout"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
