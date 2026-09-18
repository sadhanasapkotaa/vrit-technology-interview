import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardLayout from "../../layouts/DashboardLayout";

function ServicesPage() {
  const sidebarItems = [
    {
      label: "All Services",
      path: "/services",
    },
    {
      label: "Add Service",
      path: "/services/new",
    },
  ];

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          title="Services"
          items={sidebarItems}
        />
      }
    >
      <Outlet />
    </DashboardLayout>
  );
}

export default ServicesPage;