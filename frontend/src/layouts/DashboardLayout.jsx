import Navbar from "../components/Navbar";

function DashboardLayout({ sidebar, children }) {
  return (
    <div className="app">
      <Navbar />

      <div className="dashboard">
        {sidebar}

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;