import { Routes, Route, Navigate } from "react-router-dom";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceListPage from "./pages/services/ServiceListPage";
import CreateServicePage from "./pages/services/CreateServicePage";
import ServiceDetailsPage from "./pages/services/ServiceDetailsPage";
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import AppointmentDetailsPage from "./pages/appointments/AppointmentDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/appointments" replace />} />

      <Route path="/services" element={<ServicesPage />}>
        <Route index element={<ServiceListPage />} />
        <Route path="new" element={<CreateServicePage />} />
        <Route path=":id" element={<ServiceDetailsPage />} />
      </Route>

      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/appointments/:id" element={<AppointmentDetailsPage />} />
    </Routes>
  );
}

export default App;