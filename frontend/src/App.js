import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import RideList from "./components/RideList";
import CreateRide from "./components/CreateRide";
import MapTracker from "./components/MapTracker";
import OwnerDashboard from "./components/OwnerDashboard";
import Feedback from "./components/Feedback";
import SOS from "./components/SOS";
import AdminDashboard from "./components/AdminDashboard";
import "./styles.css"; // Global styles if needed

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <div className="App">
        {user ? (
          <nav className="navbar">
            <h2>RideShare</h2>
            <div className="nav-links">
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
              {/* Only admin user (with specific ID) can see admin page */}
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
            </div>
          </nav>
        ) : (
          <nav className="navbar">
            <h2>RideShare</h2>
            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </nav>
        )}

        <Routes>
          {user ? (
            <>
              {user.role === "user" ? (
                <>
                  <Route path="/rides" element={<RideList />} />
                  <Route path="/create" element={<CreateRide />} />
                </>
              ) : (
                <Route path="/owner" element={<OwnerDashboard />} />
              )}
              <Route path="/map" element={<MapTracker />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/sos" element={<SOS />} />
              {user._id === "ADMIN123" && (
                <Route path="/admin" element={<AdminDashboard />} />
              )}
              <Route path="*" element={<RideList />} />
            </>
          ) : (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<LandingPage />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// CnESdw9LKlUX3IeHAAAF
