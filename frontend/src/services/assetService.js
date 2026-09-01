import api from "../api/api";

export const assetService = {
  async getAssets() {
    const response = await api.get("/assets");
    return response.data;
  },

  async getAssetById(id) {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  async createAsset(asset) {
    const response = await api.post("/assets", asset);
    return response.data;
  },

  async updateAsset(id, asset) {
    const response = await api.put(`/assets/${id}`, asset);
    return response.data;
  },

  async deleteAsset(id) {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  }
};