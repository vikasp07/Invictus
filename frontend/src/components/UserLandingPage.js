import React from "react";
import "./UserLandingPage.css";

const UserLandingPage = () => {
  return (
    <div className="user-landing">
      <header className="hero-section">
        <nav className="hero-nav">
          <div className="logo">RideShare</div>
          <div className="hero-links">
            <a href="/rides">Search</a>
            <a href="/create">Publish a ride</a>
            {/* Additional links (Profile, Help, etc.) */}
          </div>
        </nav>

        <div className="hero-content">
          <h1>Your pick of rides at low prices</h1>
          <p>
            Whether you’re going by bus or carpool, find the perfect ride from a
            wide range of destinations and routes all over Mumbai.
          </p>

          <div className="search-box">
            <div className="search-field">
              <label>Leaving from</label>
              <input type="text" placeholder="e.g. Andheri" />
            </div>
            <div className="search-field">
              <label>Going to</label>
              <input type="text" placeholder="e.g. Bandra" />
            </div>
            <div className="search-field">
              <label>Date</label>
              <input type="date" />
            </div>
            <div className="search-field">
              <label>Passengers</label>
              <input type="number" defaultValue={1} />
            </div>
            <button className="btn-search">Search</button>
          </div>
        </div>
      </header>

      <section className="info-section">
        <div className="info-card">
          <h2>Your pick of rides at low prices</h2>
          <p>
            No matter where you’re going, find the perfect ride from a wide
            range of destinations all over the city.
          </p>
        </div>
        <div className="info-card">
          <h2>Trust who you travel with</h2>
          <p>
            We make it easy to get to know each of your members and bus
            partners. Check reviews, profiles, and ID verification. So you know
            who you're travelling with and can book your ride at ease.
          </p>
        </div>
        <div className="info-card">
          <h2>Scroll, click, tap and go!</h2>
          <p>
            Booking rides has never been easier! Thanks to our simple app and
            website design you can book your next ride in just minutes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserLandingPage;
