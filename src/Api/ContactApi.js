
import API from "./axios";

// Submit a contact message
export const addContact = (contactData) =>
  API.post("/contact", contactData);
