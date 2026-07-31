import API from "./axios";

// Get all measurements
export const getMeasurements = () =>
  API.get("/measurement");

// Get one measurement
export const getMeasurementById = (id) =>
  API.get(`/measurement/${id}`);

// Add measurement
export const addMeasurement = (data) =>
  API.post("/measurement/add", data);

// Update measurement
export const updateMeasurement = (id, data) =>
  API.put(`/measurement/${id}`, data);

// Delete measurement
export const deleteMeasurement = (id) =>
  API.delete(`/measurement/${id}`);