import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServiceForm from "../../components/ServiceForm";
import { getService, updateService } from "../../api/services";

function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    getService(id)
      .then((res) => setService(res.data))
      .catch(() => setLoadError("Failed to load service."));
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await updateService(id, data);
      navigate(`/services/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadError) return <p className="error">{loadError}</p>;
  if (!service) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Service</h1>
      <ServiceForm initialData={service} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}

export default EditServicePage;