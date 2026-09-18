import { useState, useEffect } from "react";
import { getServices } from "../api/services";

function AppointmentForm({ onSubmit, submitting }) {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getServices()
      .then((res) => setServices(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await onSubmit(formData);
      setFormData({
        customer_name: "",
        customer_phone: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Customer name</label>
      <input
        name="customer_name"
        value={formData.customer_name}
        onChange={handleChange}
        required
      />
      {errors.customer_name && <p className="error">{errors.customer_name}</p>}

      <label>Customer phone</label>
      <input
        name="customer_phone"
        value={formData.customer_phone}
        onChange={handleChange}
        required
      />
      {errors.customer_phone && <p className="error">{errors.customer_phone}</p>}

      <label>Select service</label>
      <select name="service" value={formData.service} onChange={handleChange} required>
        <option value="">-- Select a service --</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} — NPR {s.price} — {s.duration} min
          </option>
        ))}
      </select>
      {errors.service && <p className="error">{errors.service}</p>}

      <label>Appointment date</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      {errors.date && <p className="error">{errors.date}</p>}

      <label>Appointment time</label>
      <input type="time" name="time" value={formData.time} onChange={handleChange} required />
      {errors.time && <p className="error">{errors.time}</p>}

      <label>Notes (optional)</label>
      <textarea name="notes" rows="2" value={formData.notes} onChange={handleChange} />

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}

export default AppointmentForm;