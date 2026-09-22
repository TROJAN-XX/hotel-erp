import { NavLink, Outlet } from "react-router-dom";

const adminLinks = [
  { label: "Dashboard", to: "/admin" },
  { label: "Bookings", to: "/admin/bookings" },
  { label: "Rooms", to: "/admin/rooms" },
  { label: "Restaurants", to: "/admin/restaurants" },
  { label: "Tours", to: "/admin/tours" },
  { label: "Transport", to: "/admin/transport" },
  { label: "Wellness", to: "/admin/wellness" },
  { label: "Packages", to: "/admin/packages" },
  { label: "Customers", to: "/admin/customers" },
  { label: "Payments", to: "/admin/payments" },
  { label: "Reports", to: "/admin/reports" },
  { label: "Settings", to: "/admin/settings" },
];

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-mark">A</div>
          <div>
            <strong>Asteria ERP</strong>
            <small>Admin Console</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {adminLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
