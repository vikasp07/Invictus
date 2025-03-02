import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage"; // Public landing page
import Login from "./components/Login";
import Register from "./components/Register";
import UserLandingPage from "./components/UserLandingPage"; // Regular user's landing page
import OwnerLandingPage from "./components/OwnerLandingPage"; // Owner's landing page
import CreateRide from "./components/CreateRide"; // Page where user can create a ride
import RideList from "./components/RideList"; // Page showing available (shared) rides
import MapTracker from "./components/MapTracker"; // Optional: track rides on a map
import OwnerDashboard from "./components/OwnerDashboard"; // For owners to confirm rides
import Feedback from "./components/Feedback";
import SOS from "./components/SOS";
import "./styles.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <div className="content">
          {user ? (
            user.role === "user" ? (
              <Routes>
                {/* Regular user landing page */}
                <Route path="/user-landing" element={<UserLandingPage />} />
                {/* User can create ride and share ride */}
                <Route path="/create" element={<CreateRide />} />
                <Route path="/rides" element={<RideList />} />
                <Route path="/map" element={<MapTracker />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/sos" element={<SOS />} />
                {/* Fallback to user landing page */}
                <Route path="*" element={<UserLandingPage />} />
              </Routes>
            ) : user.role === "owner" ? (
              <Routes>
                {/* Owner landing page */}
                <Route path="/owner-landing" element={<OwnerLandingPage />} />
                {/* Owner dashboard for confirming rides */}
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/map" element={<MapTracker />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/sos" element={<SOS />} />
                {/* Fallback to owner landing page */}
                <Route path="*" element={<OwnerLandingPage />} />
              </Routes>
            ) : null
          ) : (
            <Routes>
              {/* Public routes for non-logged in users */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          )}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
