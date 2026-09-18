import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentForm from "../../components/AppointmentForm";
import { createAppointment } from "../../api/appointments";

function CreateAppointmentPage() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await createAppointment(data);
      navigate("/appointments");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Book Appointment</h1>
      <AppointmentForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}

export default CreateAppointmentPage;