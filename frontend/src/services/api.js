import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const getAvailableRides = () => API.get("/rides/available");
export const createRide = (data) => API.post("/rides/create", data);
export const joinRide = (rideId, userId) =>
  API.post(`/rides/join/${rideId}`, { userId });
