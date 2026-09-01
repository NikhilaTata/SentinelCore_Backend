import api from "../api/api";

export const authService = {
  async login(credentials) {
    // Change "/auth/login" if your Spring Boot authentication endpoint is different.
    const response = await api.post("/auth/login", credentials);
    if (response.data?.token) {
      localStorage.setItem("sentinelcore_token", response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem("sentinelcore_token");
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("sentinelcore_token"));
  }
};