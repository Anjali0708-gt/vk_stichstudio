import API from "./axios";

// Get reviews for a particular product
export const getProductReviews = (productId) =>
  API.get(`/reviews/${productId}/reviews`);

// Add review for a particular product
export const addReview = (productId, data) =>
  API.post(`/reviews/${productId}/reviews`, data);