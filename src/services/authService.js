import * as authApi from '../Api/UserApi';

export const authService = {
  login: async (email, password) => {
    const res = await authApi.login({ email, password });
    return res.data; // adjust based on what your backend actually returns
  },

  register: async (userData) => {
    const res = await authApi.signUp(userData);
    return res.data;
  },

  resetPassword: async (email) => {
    const res = await authApi.forgotPassword({ email });
    return res.data;
  },
};