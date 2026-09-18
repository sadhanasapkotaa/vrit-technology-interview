import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices, deleteService } from "../../api/services";

function ServiceListPage() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState(null);

  const loadServices = () => {
    getServices()
      .then((res) => setServices(res.data))
      .catch(() => setMessage({ type: "error", text: "Failed to load services." }));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      loadServices();
    } catch {
      setMessage({ type: "error", text: "Delete failed." });
    }
  };

  return (
    <div>
      <h1>Services</h1>
      {message && <p className={message.type}>{message.text}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 && (
            <tr>
              <td colSpan="4">No services found.</td>
            </tr>
          )}
          {services.map((s) => (
            <tr key={s.id}>
              <td>
                <Link to={`/services/${s.id}`}>{s.name}</Link>
              </td>
              <td>NPR {s.price}</td>
              <td>{s.duration} min</td>
              <td>
                <button className="btn-danger" onClick={() => handleDelete(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceListPage;