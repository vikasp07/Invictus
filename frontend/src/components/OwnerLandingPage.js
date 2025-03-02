import React from "react";
import "./OwnerLandingPage.css";

const OwnerLandingPage = () => {
  return (
    <div className="owner-landing">
      <header className="owner-hero">
        <nav className="owner-hero-nav">
          <div className="logo">RideShare (Owner)</div>
          <div className="owner-hero-links">
            <a href="/owner">Dashboard</a>
            <a href="/map">Track Rides</a>
            {/* Add more links as needed */}
          </div>
        </nav>

        <div className="owner-hero-content">
          <h1>Offer rides, earn money</h1>
          <p>
            Share your ride with passengers going the same way. Help reduce
            traffic, save the environment, and earn in the process!
          </p>
          <div className="publish-box">
            <button className="btn-publish">Publish a Ride</button>
            <button className="btn-manage">Manage My Rides</button>
          </div>
        </div>
      </header>

      <section className="owner-info-section">
        <div className="owner-info-card">
          <h2>Why become an Owner?</h2>
          <p>
            Earn extra money by sharing empty seats. Provide safe, reliable
            rides to people traveling the same route.
          </p>
        </div>
        <div className="owner-info-card">
          <h2>Flexible Scheduling</h2>
          <p>
            You decide when and where you drive. Set your own schedule and
            prices based on real-time traffic or personal preference.
          </p>
        </div>
        <div className="owner-info-card">
          <h2>Easy Management</h2>
          <p>
            Use our Owner Dashboard to confirm ride requests, track rides in
            real time, and communicate with passengers instantly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OwnerLandingPage;
