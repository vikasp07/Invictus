import React, { useEffect, useState } from "react";
import { getAdminRides, getAdminUsers, getAnalytics } from "../services/api";

const AdminDashboard = () => {
  const [rides, setRides] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    getAdminRides().then((res) => setRides(res.data));
    getAdminUsers().then((res) => setUsers(res.data));
    getAnalytics().then((res) => setAnalytics(res.data));
  }, []);

  return (
    <div className="container animate-slide-up">
      <h2>Admin Dashboard</h2>
      <div className="analytics">
        <h3>Analytics</h3>
        <p>Total Rides: {analytics.totalRides}</p>
        <p>Completed Rides: {analytics.completedRides}</p>
        <p>Cancelled Rides: {analytics.cancelledRides}</p>
      </div>
      <div className="card-group">
        <h3>All Rides</h3>
        {rides.map((ride) => (
          <div key={ride._id} className="card">
            <p>
              <strong>From:</strong> {ride.pickup}
            </p>
            <p>
              <strong>To:</strong> {ride.destination}
            </p>
            <p>
              <strong>Status:</strong> {ride.status}
            </p>
          </div>
        ))}
      </div>
      <div className="card-group">
        <h3>All Users</h3>
        {users.map((user) => (
          <div key={user._id} className="card">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
