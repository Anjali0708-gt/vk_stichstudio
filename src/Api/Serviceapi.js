import API from "./axios";

export const getServices = () =>
  API.get("/service");

export const addService = (data) =>
  API.post("/service", data);

export const updateService = (id, data) =>
  API.put(`/service/${id}`, data);

export const deleteService = (id) =>
  API.delete(`/service/${id}`);