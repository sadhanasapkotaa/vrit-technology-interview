import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getAppointments, deleteAppointment } from "../../api/appointments";

function AppointmentsPage() {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "";
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState(null);

  const sidebarItems = [
    { label: "All Appointments", path: "/appointments" },
    { label: "New Appointment", path: "/appointments/new" },
    { label: "Pending", path: "/appointments?status=pending" },
    { label: "Confirmed", path: "/appointments?status=confirmed" },
    { label: "Completed", path: "/appointments?status=completed" },
    { label: "Cancelled", path: "/appointments?status=cancelled" },
  ];

  const loadAppointments = () => {
    getAppointments(statusFilter)
      .then((res) => setAppointments(res.data))
      .catch(() => setMessage({ type: "error", text: "Failed to load appointments." }));
  };

  useEffect(() => {
    loadAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete appointment #${id}?`)) return;
    try {
      await deleteAppointment(id);
      loadAppointments();
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    }
  };

  return (
    <DashboardLayout sidebar={<Sidebar title="Appointments" items={sidebarItems} />}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Appointments</h1>
        <Link to="/appointments/new" className="btn-primary">
          + New Appointment
        </Link>
      </div>

      {message && <p className={message.type}>{message.text}</p>}

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 && (
            <tr>
              <td colSpan="6">No appointments found.</td>
            </tr>
          )}
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>
                {appt.customer_name}
                <br />
                <small>{appt.customer_phone}</small>
              </td>
              <td>{appt.service_detail ? appt.service_detail.name : appt.service}</td>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>
                <span className={`status status-${appt.status}`}>{appt.status}</span>
              </td>
              <td>
                <Link to={`/appointments/${appt.id}`} className="btn-secondary">
                  Update
                </Link>
                <button className="btn-danger" onClick={() => handleDelete(appt.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default AppointmentsPage;