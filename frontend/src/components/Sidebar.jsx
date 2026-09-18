import { NavLink } from "react-router-dom";

function Sidebar({ title, items }) {
  return (
    <aside className="sidebar">
      <h2>{title}</h2>

      <div className="sidebar-links">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;