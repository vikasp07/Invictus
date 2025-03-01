import React, { useEffect, useState } from "react";
import { getAvailableRides, joinRide } from "../services/api";

const RideList = () => {
  const [rides, setRides] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAvailableRides().then((res) => setRides(res.data));
  }, []);

  const handleJoin = (rideId) => {
    joinRide(rideId, user._id).then(() =>
      alert("Joined the ride successfully!")
    );
  };

  return (
    <div className="container">
      <h2>Available Rides</h2>
      {rides.map((ride) => (
        <div key={ride._id} className="ride-card">
          <p>
            <strong>From:</strong> {ride.pickup}
          </p>
          <p>
            <strong>To:</strong> {ride.destination}
          </p>
          <p>
            <strong>Driver:</strong> {ride.driver.name}
          </p>
          <p>
            <strong>Fare:</strong> ₹{ride.fare}
          </p>
          <button onClick={() => handleJoin(ride._id)}>Join Ride</button>
        </div>
      ))}
    </div>
  );
};

export default RideList;
