import React, { useEffect, useState } from "react";
import { getAvailableRides, confirmRide } from "../services/api";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();
  const owner = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAvailableRides().then((res) => setRides(res.data));
  }, []);

  const handleConfirm = (rideId) => {
    const estimatedTime = prompt("Enter estimated time (in minutes):");
    const finalFare = prompt("Enter final fare (in INR):");
    if (estimatedTime && finalFare) {
      confirmRide(rideId, {
        ownerId: owner._id,
        estimatedTime: parseInt(estimatedTime),
        finalFare: parseFloat(finalFare),
      })
        .then(() => {
          alert("Ride confirmed successfully!");
          // Refresh the list
          getAvailableRides().then((res) => setRides(res.data));
        })
        .catch((err) => alert("Error confirming ride"));
    }
  };

  return (
    <div className="container animate-slide-up">
      <h2>Owner Dashboard</h2>
      <p>Pending ride requests:</p>
      {rides.length === 0 && <p>No pending rides available.</p>}
      {rides.map((ride) => (
        <div key={ride._id} className="card">
          <p>
            <strong>From:</strong> {ride.pickup}
          </p>
          <p>
            <strong>To:</strong> {ride.destination}
          </p>
          <p>
            <strong>Fare (Estimated):</strong> ₹{ride.fare}
          </p>
          <p>
            <strong>Scheduled Time:</strong>{" "}
            {ride.scheduledTime
              ? new Date(ride.scheduledTime).toLocaleString()
              : "ASAP"}
          </p>
          {ride.status === "pending" && (
            <button className="btn" onClick={() => handleConfirm(ride._id)}>
              Confirm Ride
            </button>
          )}
          {ride.status === "confirmed" && (
            <div className="confirmed-info">
              <p>
                <strong>Ride Confirmed!</strong>
              </p>
              <p>Estimated Time: {ride.estimatedTime} mins</p>
              <p>Final Fare: ₹{ride.finalFare}</p>
            </div>
          )}
        </div>
      ))}
      <button className="btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default OwnerDashboard;
