// Mock Booking Service
// Manages consultation and tailoring appointments. Persists to the mock database.

const DELAY = 800;

export const bookingService = {
  createBooking: async (bookingData, userId = null) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const bookingId = 'B-' + Math.floor(1000 + Math.random() * 9000);
          const newBooking = {
            id: bookingId,
            ...bookingData,
            status: 'Confirmed',
            createdAt: new Date().toISOString().split('T')[0]
          };

          // If a user is logged in, attach booking to their profile
          if (userId) {
            const users = JSON.parse(localStorage.getItem('vk_users') || '[]');
            const userIndex = users.findIndex(u => u.id === userId);
            
            if (userIndex !== -1) {
              if (!users[userIndex].bookings) {
                users[userIndex].bookings = [];
              }
              users[userIndex].bookings.push(newBooking);
              localStorage.setItem('vk_users', JSON.stringify(users));
              
              // Also update currently logged in user context in local storage if used
              const sessionUser = JSON.parse(localStorage.getItem('vk_current_user') || '{}');
              if (sessionUser && sessionUser.id === userId) {
                if (!sessionUser.bookings) {
                  sessionUser.bookings = [];
                }
                sessionUser.bookings.push(newBooking);
                localStorage.setItem('vk_current_user', JSON.stringify(sessionUser));
              }
            }
          }

          resolve({ success: true, booking: newBooking });
        } catch {
          reject(new Error('Failed to create booking. Please try again.'));
        }
      }, DELAY);
    });
  }
};
