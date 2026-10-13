import API from "./axios";

// export const getProducts = () => API.get("/product");



// Fetch all products or search by keyword
export const getProducts = (search = "") =>
  API.get("/product", {
    params: search.trim() ? { search: search.trim() } : {}
  });


export const getProductById = (id) => API.get(`/product/${id}`);

export const addProduct = (data) => API.post(`/product`, data);

export const editProduct = (id, data) => API.put(`/product/${id}`, data);

export const deleteProduct = (id) => API.delete(`/product/${id}`);