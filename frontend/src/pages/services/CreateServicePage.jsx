import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceForm from "../../components/ServiceForm";
import { createService } from "../../api/services";

function CreateServicePage() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await createService(data);
      navigate("/services");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Service</h1>
      <ServiceForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}

export default CreateServicePage;