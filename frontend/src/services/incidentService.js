import api from "../api/api";

export const incidentService = {
  async getIncidents() {
    const response = await api.get("/incidents");
    return response.data;
  },

  async getAllIncidents() {
    const response = await api.get("/incidents");
    return response.data;
  }
};

export const getIncidents = async () => {
  const response = await api.get("/incidents");
  return response.data;
};

export const getAllIncidents = async () => {
  const response = await api.get("/incidents");
  return response.data;
};
