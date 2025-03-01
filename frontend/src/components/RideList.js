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
    <div className="container animate-slide-up">
      <h2>Available Rides</h2>
      {rides.length === 0 ? (
        <p>No rides available at the moment.</p>
      ) : (
        rides.map((ride) => (
          <div key={ride._id} className="card">
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
            <p>
              <strong>Scheduled Time:</strong>{" "}
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
                <p>Ride Confirmed!</p>
                <p>Estimated Time: {ride.estimatedTime} mins</p>
                <p>Final Fare: ₹{ride.finalFare}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RideList;
