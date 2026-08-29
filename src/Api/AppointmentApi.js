import API from "./axios";

// export const getAvailableSlots = () =>
//   API.get("/appointments/slots");

export const getAvailableSlots = (date) =>
  API.get("/appointments/slots", {
    params: { date }
  });

export const createAppointment = (data) =>
  API.post("/appointments", data);