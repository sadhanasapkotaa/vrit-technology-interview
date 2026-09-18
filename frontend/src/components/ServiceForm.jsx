import { useState } from "react";

function ServiceForm({ initialData = {}, onSubmit, submitting }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    price: initialData.price || "",
    duration: initialData.duration || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await onSubmit(formData);
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Service name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />
      {errors.name && <p className="error">{errors.name}</p>}

      <label>Price</label>
      <input
        type="number"
        step="0.01"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      {errors.price && <p className="error">{errors.price}</p>}

      <label>Duration (minutes)</label>
      <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        required
      />
      {errors.duration && <p className="error">{errors.duration}</p>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Saving..." : "Save Service"}
      </button>
    </form>
  );
}

export default ServiceForm;