import apiClient from "./client";

export const getAppointments = (statusFilter = "", search = "", dateFilter = "") => {
  const params = new URLSearchParams();
  if (statusFilter) params.append("status", statusFilter);
  if (search) params.append("search", search);
  if (dateFilter) params.append("date", dateFilter);

  const query = params.toString();
  return apiClient.get(query ? `appointments/?${query}` : "appointments/");
};

export const getAppointment = (id) => apiClient.get(`appointments/${id}/`);

export const createAppointment = (data) => apiClient.post("appointments/", data);

export const updateAppointmentStatus = (id, status) =>
  apiClient.patch(`appointments/${id}/`, { status });

export const deleteAppointment = (id) => apiClient.delete(`appointments/${id}/`);

export const getAppointmentSummary = () => apiClient.get("appointments/summary/");