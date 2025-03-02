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
    joinRide(rideId, user._id).then(() =>
      alert("Joined the ride successfully!")
    );
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
              <strong>From:</strong> {ride.pickup}
            </p>
            <p>
              <strong>To:</strong> {ride.destination}
            </p>
            <p>
              <strong>Ride Time:</strong>{" "}
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
                <p>
                  Price per person: ₹
                  {(
                    ride.fare /
                    (1 + (ride.passengers ? ride.passengers.length : 0))
                  ).toFixed(2)}
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
