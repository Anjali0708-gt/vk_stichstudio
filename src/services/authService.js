// Mock Authentication Service
// Isolates all auth backend communications. swap this out for real API calls in the future.

const DELAY = 800; // Simulated network delay in ms

// Load users from localStorage or initialize with a default user
const getStoredUsers = () => {
  const users = localStorage.getItem('vk_users');
  return users ? JSON.parse(users) : [
    {
      id: '1',
      name: 'Anjali Sharma',
      email: 'user@example.com',
      password: 'password123',
      bookings: [
        {
          id: 'B-1024',
          service: 'Wedding Wear Fitting',
          date: '2026-06-25',
          time: '14:30',
          status: 'Confirmed'
        }
      ]
    }
  ];
};

const saveUsers = (users) => {
  localStorage.setItem('vk_users', JSON.stringify(users));
};

export const authService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
          reject(new Error('Invalid email or password.'));
          return;
        }
        
        if (user.password !== password) {
          reject(new Error('Invalid email or password.'));
          return;
        }
        
        // Return user profile without password
        const userProfile = { ...user };
        delete userProfile.password;
        resolve(userProfile);
      }, DELAY);
    });
  },

  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const emailExists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
        
        if (emailExists) {
          reject(new Error('Email address is already registered.'));
          return;
        }

        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          name: userData.name,
          email: userData.email,
          password: userData.password,
          bookings: []
        };

        users.push(newUser);
        saveUsers(users);

        const userProfile = { ...newUser };
        delete userProfile.password;
        resolve(userProfile);
      }, DELAY);
    });
  },

  resetPassword: async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!userExists) {
          reject(new Error('No account found with this email.'));
          return;
        }

        resolve({ success: true, message: 'Password reset link sent to your email.' });
      }, DELAY);
    });
  },

  getUserBookings: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const user = users.find(u => u.id === userId);
        resolve(user ? user.bookings : []);
      }, DELAY);
    });
  }
};
