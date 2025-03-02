import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getAvailableRides = () => API.get("/rides/available");
export const createRide = (data) => API.post("/rides/create", data);
export const joinRide = (rideId, userId) =>
  API.post(`/rides/join/${rideId}`, { userId });
export const updateLocation = (rideId, data) =>
  API.post(`/rides/update-location/${rideId}`, data);
export const cancelRide = (rideId, data) =>
  API.post(`/rides/cancel/${rideId}`, data);
export const submitFeedback = (data) => API.post("/feedback", data);
export const getFeedbacks = () => API.get("/feedback");
export const getAdminRides = () => API.get("/admin/rides");
export const getAdminUsers = () => API.get("/admin/users");
export const getAnalytics = () => API.get("/admin/analytics");
export const confirmRide = (rideId, data) =>
  API.post(`/rides/confirm/${rideId}`, data);
// New function to get the current ride for a user:
export const getCurrentRide = (userId) => API.get(`/rides/current/${userId}`);
