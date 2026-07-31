import API from "./axios";

// Login
export const login = (data) =>
  API.post("/customer/Login", data);

// Sign Up
export const signUp = (data) =>
  API.post("/customer/signin", data);

// Forgot Password
export const forgotPassword = (data) =>
  API.post("/customer/forgetPassword", data);

// Reset Password
export const resetPassword = (data) =>
  API.put("/customer/resetpassword", data);

// Get All Customers (Protected)
export const getCustomers = () =>
  API.get("/customer");

// Get Customer By ID (Protected)
export const getCustomerById = (id) =>
  API.get(`/customer/${id}`);

// Delete Customer (Protected)
export const deleteCustomer = (id) =>
  API.delete(`/customer/delete/${id}`);