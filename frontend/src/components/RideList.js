// src/components/RideList.js
import React, { useEffect, useState } from "react";
import { getAvailableRides, joinRide } from "../services/api";
import "./RideList.css";

const RideList = () => {
  const [rides, setRides] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAvailableRides().then((res) => setRides(res.data));
  }, []);

  const handleJoin = (rideId) => {
    joinRide(rideId, user._id).then(() => {
      alert("Joined the ride successfully!");
      // Refresh the ride list to show updated passengers count
      getAvailableRides().then((res) => setRides(res.data));
    });
  };

  return (
    <div className="ride-list-container">
      <h2>Available Rides</h2>
      {rides.length === 0 ? (
        <p>No rides available at the moment.</p>
      ) : (
        rides.map((ride) => (
          <div key={ride._id} className="ride-card">
            <p>
              <strong>Source:</strong> {ride.pickup}
            </p>
            <p>
              <strong>Destination:</strong> {ride.destination}
            </p>
            <p>
              <strong>Availability Time:</strong>{" "}
              {ride.scheduledTime
                ? new Date(ride.scheduledTime).toLocaleString()
                : "ASAP"}
            </p>
            {ride.status === "pending" && (
              <button className="btn" onClick={() => handleJoin(ride._id)}>
                Join Ride
              </button>
            )}
            {ride.status === "confirmed" && (
              <div className="confirmed-info">
                <p>
                  <strong>Ride Confirmed!</strong>
                </p>
                <p>Estimated Time: {ride.estimatedTime} minutes</p>
                <p>Total Price: ₹{ride.finalFare}</p>
                <p>
                  Your Share: ₹
                  {ride.passengers && ride.passengers.length > 0
                    ? (ride.finalFare / (ride.passengers.length + 1)).toFixed(2)
                    : ride.finalFare}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RideList;
