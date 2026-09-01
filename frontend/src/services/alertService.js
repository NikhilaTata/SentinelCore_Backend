import api from "../api/api";

export const alertService = {
  async getAlerts() {
    const response = await api.get("/alerts");
    return response.data;
  }
};