import api from "../api/api";

export const alertService = {

  async getAlerts() {
    const response = await api.get("/alerts");
    return response.data;
  },


  async getAllAlerts() {
    const response = await api.get("/alerts");
    return response.data;
  },


  async getOpenAlerts() {
    const response = await api.get("/alerts");
    return response.data;
  }
};


export const getAlerts = async () => {
  const response = await api.get("/alerts");
  return response.data;
};

export const getAllAlerts = async () => {
  const response = await api.get("/alerts");
  return response.data;
};
