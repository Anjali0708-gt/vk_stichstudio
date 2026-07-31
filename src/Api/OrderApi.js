import API from "./axios";

// Get all orders
export const getOrders = () =>
  API.get("/order");

// Get single order
export const getOrderById = (id) =>
  API.get(`/order/${id}`);

// Create order
export const createOrder = (data) =>
  API.post("/order", data);

// Update order
export const updateOrder = (id, data) =>
  API.put(`/order/${id}`, data);

// Delete order
export const deleteOrder = (id) =>
  API.delete(`/order/${id}`);