const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...options.headers,
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export const bookingService = {
  async getAvailableSlots(date) {
    if (!date) {
      throw new Error("Date is required.");
    }

    return apiRequest(
      `/appointments/slots?date=${encodeURIComponent(date)}`,
      {
        method: "GET",
      }
    );
  },

  async createBooking(formData, userId) {
    const payload = {
      service: formData.service,
      date: formData.date,
      time: formData.time,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
      userId: userId || null,
    };

    return apiRequest("/appointments", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getUserBookings(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    return apiRequest(`/appointments/user/${userId}`, {
      method: "GET",
    });
  },

  async getBookingById(appointmentId) {
    if (!appointmentId) {
      throw new Error("Appointment ID is required.");
    }

    return apiRequest(`/appointments/${appointmentId}`, {
      method: "GET",
    });
  },

  async cancelBooking(appointmentId) {
    if (!appointmentId) {
      throw new Error("Appointment ID is required.");
    }

    return apiRequest(`/appointments/${appointmentId}`, {
      method: "DELETE",
    });
  },
};