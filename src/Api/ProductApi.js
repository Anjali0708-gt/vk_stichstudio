import API from "./axios";

export const getProducts = () => API.get("/product");   

export const getProductById = (id) => API.get(`/product/${id}`);

export const addProduct = (data) => API.post(`/product`, data);

export const editProduct = (id, data) => API.put(`/product/${id}`, data);

export const deleteProduct = (id) => API.delete(`/product/${id}`);