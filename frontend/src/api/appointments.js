import apiClient from "./client";

export const getAppointments = (statusFilter = "") => {
  const url = statusFilter
    ? `appointments/?status=${encodeURIComponent(statusFilter)}`
    : "appointments/";
  return apiClient.get(url);
};

export const getAppointment = (id) => apiClient.get(`appointments/${id}/`);

export const createAppointment = (data) => apiClient.post("appointments/", data);

export const updateAppointmentStatus = (id, status) =>
  apiClient.patch(`appointments/${id}/`, { status });

export const deleteAppointment = (id) => apiClient.delete(`appointments/${id}/`);