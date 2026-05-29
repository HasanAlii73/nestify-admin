import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { getToken } from "../utils/auth";

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // run filters before rendering
  const filtered = users
    .filter((user) => {
      if (roleFilter === "all") return true;
      return user.role === roleFilter;
    })
    .filter((user) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  useEffect(() => {
  axios.get(`${BASE_URL}/api/users/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '24px', color: '#7A8299' }}>Loading users...</p>;
  if (error)   return <p style={{ padding: '24px', color: '#C0392B' }}>{error}</p>;

  return (
    <div>
      {/* Search Bar */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 14px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
          }}
        />

        {/* Filter btns */}
        {["all", "seller", "buyer"].map((s) => (
          <button
            key={s}
            onClick={() => setRoleFilter(s)}
            style={{
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              padding: "10px 18px",
              background: roleFilter === s ? "#1B4F72" : "#fff",
              color: roleFilter === s ? "#fff" : "#7A8299",
              fontWeight: "500",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          borderRadius: "10px",
          padding: "24px",
        }}
      >
        {/* Empty State */}
        {filtered.length === 0 && (
          <p
            style={{ textAlign: "center", color: "#7A8299", fontSize: "14px" }}
          >
            No Users matches your search.
          </p>
        )}
        {filtered.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{ borderBottom: "2px solid #f0f0f0", textAlign: "left" }}
              >
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Listings</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          user.role === "seller" ? "#EBF3FA" : "#D5F5E3",
                        color: user.role === "seller" ? "#1B4F72" : "#1A6E35",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td style={tdStyle}>{user.listings}</td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        background: "none",
                        border: "1px solid #FADBD8",
                        color: "#C0392B",
                        padding: "5px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
const thStyle = {
  padding: "10px 12px",
  color: "#7A8299",
  fontSize: "13px",
  fontWeight: "600",
};
const tdStyle = { padding: "12px", fontSize: "14px", color: "#1C2333" };
export default Users;
