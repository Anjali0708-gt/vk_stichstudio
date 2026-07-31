import API from "./axios";

// Create Payment Intent (Stripe)
export const createPaymentIntent = (data) =>
  API.post("/payment/create-payment-intent", data);

// Create Checkout Session
export const createCheckoutSession = (data) =>
  API.post("/payment/payment/create-checkout-session", data);