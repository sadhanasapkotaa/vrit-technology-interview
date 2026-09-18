import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAppointment, updateAppointmentStatus, deleteAppointment } from "../../api/appointments";

const TRANSITIONS = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Completed", "Cancelled"],
  Completed: [],
  Cancelled: [],
};

function AppointmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [message, setMessage] = useState(null);

  const loadAppointment = () => {
    getAppointment(id)
      .then((res) => {
        setAppointment(res.data);
        setNewStatus(res.data.status);
      })
      .catch(() => setMessage({ type: "error", text: "Failed to load appointment." }));
  };

  useEffect(() => {
    loadAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdate = async () => {
    if (newStatus === appointment.status) return;
    try {
      await updateAppointmentStatus(id, newStatus);
      setMessage({ type: "success", text: "Status updated." });
      loadAppointment();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.status?.[0] || "Update failed.",
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this appointment?")) return;
    try {
      await deleteAppointment(id);
      navigate("/appointments");
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    }
  };

  if (!appointment) return <p>{message ? message.text : "Loading..."}</p>;

  const nextOptions = TRANSITIONS[appointment.status] || [];

  return (
    <div>
      <h1>Appointment #{appointment.id}</h1>
      {message && <p className={message.type}>{message.text}</p>}

      <p><strong>Customer:</strong> {appointment.customer_name}</p>
      <p><strong>Phone:</strong> {appointment.customer_phone}</p>
      <p><strong>Service:</strong> {appointment.service_detail?.name}</p>
      <p><strong>Date:</strong> {appointment.date}</p>
      <p><strong>Time:</strong> {appointment.time}</p>
      <p><strong>Notes:</strong> {appointment.notes || "—"}</p>
      <p><strong>Status:</strong> {appointment.status}</p>

      <label>Update status</label>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        disabled={nextOptions.length === 0}
      >
        <option value={appointment.status}>{appointment.status}</option>
        {nextOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button className="btn-primary" onClick={handleUpdate}>Update</button>
      <button className="btn-danger" onClick={handleDelete}>Delete Appointment</button>
    </div>
  );
}

export default AppointmentDetailsPage;