import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getService, deleteService } from "../../api/services";

function ServiceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getService(id)
      .then((res) => setService(res.data))
      .catch(() => setMessage({ type: "error", text: "Failed to load service." }));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      navigate("/services");
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    }
  };

  const handleBackToServices = () => {
    navigate("/services");
    };

  const handleEdit = () => {
    navigate(`/services/${id}/edit`);
    };

  if (!service) return <p>{message ? message.text : "Loading..."}</p>;

  return (
    <div>
      <h1>{service.name}</h1>
      <p>Price: NPR {service.price}</p>
      <p>Duration: {service.duration} minutes</p>
      <button className="btn-danger" onClick={handleDelete}>
        Delete Service
      </button>
      <button className="btn-secondary" onClick={handleEdit}>
        Edit Service
      </button>
      <button onClick={handleBackToServices}>
        All Services
      </button>
    </div>
  );
}

export default ServiceDetailsPage;