import * as authApi from '../Api/UserApi';

const extractToken = (value, visited = new WeakSet()) => {
  if (!value || typeof value !== 'object') return null;
  if (visited.has(value)) return null;
  visited.add(value);

  if (typeof value.token === 'string' && value.token) return value.token;
  if (typeof value.accessToken === 'string' && value.accessToken) return value.accessToken;
  if (typeof value.authToken === 'string' && value.authToken) return value.authToken;

  if (value.data && typeof value.data === 'object') {
    const nestedToken = extractToken(value.data, visited);
    if (nestedToken) return nestedToken;
  }

  if (value.user && typeof value.user === 'object') {
    const nestedToken = extractToken(value.user, visited);
    if (nestedToken) return nestedToken;
  }

  if (value.result && typeof value.result === 'object') {
    const nestedToken = extractToken(value.result, visited);
    if (nestedToken) return nestedToken;
  }

  for (const nestedValue of Object.values(value)) {
    if (nestedValue && typeof nestedValue === 'object') {
      const nestedToken = extractToken(nestedValue, visited);
      if (nestedToken) return nestedToken;
    }
  }

  return null;
};

const normalizeAuthResponse = (payload) => {
  const token = extractToken(payload);

  if (!payload || typeof payload !== 'object') {
    return payload;
  }

  return {
    ...payload,
    token: token || payload.token || null,
    accessToken: token || payload.accessToken || null,
    authToken: token || payload.authToken || null,
  };
};

export const authService = {
  login: async (email, password) => {
    const res = await authApi.login({ email, password });
    return normalizeAuthResponse(res.data);
  },

  register: async (userData) => {
    const res = await authApi.signUp(userData);
    return normalizeAuthResponse(res.data);
  },

  resetPassword: async (email) => {
    const res = await authApi.forgotPassword({ email });
    return normalizeAuthResponse(res.data);
  },
};