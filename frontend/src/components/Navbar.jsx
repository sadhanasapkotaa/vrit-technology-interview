import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Appointment System
      </div>

      <div className="navbar-links">
        <NavLink to="/services">
          Services
        </NavLink>

        <NavLink to="/appointments">
          Appointments
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;