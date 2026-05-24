import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, Users, Settings } from "lucide-react";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#1B4F72",
        padding: "24px 0",
        boxShadow: "4px 0 12px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: "22px",
          fontWeight: "bold",
          padding: "0 24px 32px",
        }}
      >
        Nestify Admin
      </div>

      <nav>
        <NavLink to="/Dashboard" style={navStyle}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        <NavLink to="/Listings" style={navStyle}>
          <Building2 size={18} />
          Listings
        </NavLink>
        <NavLink to="/Users" style={navStyle}>
          <Users size={18} />
          Users
        </NavLink>
        <NavLink to="/Settings" style={navStyle}>
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

const navStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 24px",
  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
  background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
  textDecoration: "none",
  fontWeight: isActive ? "600" : "400",
});

export default Sidebar;
