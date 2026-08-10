import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const getStoredToken = () => {
  if (typeof window === "undefined") return null;

  const readFromStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const fallbackUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("vk_current_user") || "null");
    } catch {
      return null;
    }
  })();

  const tokenCandidates = [
    readFromStorage("token"),
    readFromStorage("authToken"),
    readFromStorage("accessToken"),
    fallbackUser?.token,
    fallbackUser?.accessToken,
    fallbackUser?.authToken,
    fallbackUser?.user?.token,
    fallbackUser?.user?.accessToken,
    fallbackUser?.user?.authToken,
  ];

  return tokenCandidates.find((value) => typeof value === "string" && value.trim()) || null;
};

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token) {
      if (config.headers && typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
        config.headers.set("x-auth-token", token);
      } else {
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${token}`,
          "x-auth-token": token,
        };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;