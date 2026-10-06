import API from "./axios";


export const getProductReviews = (productId) => {
  return API.get(`/reviews/${productId}/reviews`);
};


export const addReview = (productId, data) => {
  return API.post(`/reviews/${productId}/reviews`, data);
};