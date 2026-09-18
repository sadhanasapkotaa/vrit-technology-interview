import apiClient from "./client";

export const getServices = () => apiClient.get("services/");

export const getService = (id) => apiClient.get(`services/${id}/`);

export const createService = (data) => apiClient.post("services/", data);

export const updateService = (id, data) => apiClient.patch(`services/${id}/`, data);

export const deleteService = (id) => apiClient.delete(`services/${id}/`);