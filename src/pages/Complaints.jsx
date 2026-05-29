import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { getToken } from "../utils/auth";

function Complaints() {
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [complaintsList, setComplaintsList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filtered = complaintsList.filter((complaint) => {
    if (statusFilter === "all") return true;
    return complaint.status === statusFilter;
  });

  const handleDelete = (id) => {
    setComplaintsList(
      complaintsList.filter((complaint) => complaint.id !== id),
    );
  };

  const handleStatus = (id, newStatus) => {
    setComplaintsList(
      complaintsList.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint,
      ),
    );
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/reports/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => {
        setComplaintsList(res.data.data.reports);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setError("Failed to load complaints.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: '24px', color: '#7A8299' }}>Loading complaints...</p>;
  if (error)   return <p style={{ padding: '24px', color: '#C0392B' }}>{error}</p>;

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        {/* Filter Btns */}
        {["all", "pending", "reviewed", "resolved"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              padding: "10px 18px",
              background: statusFilter === s ? "#1B4F72" : "#fff",
              color: statusFilter === s ? "#fff" : "#7A8299",
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
        {filtered.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{ borderBottom: "2px solid #f0f0f0", textAlign: "left" }}
              >
                <th style={thStyle}>User</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((complaint) => (
                <>
                  <tr
                    key={complaint.id}
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                  >
                    <td style={tdStyle}>{complaint.userName}</td>
                    <td style={tdStyle}>{complaint.title}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          background:
                            complaint.status === "pending"
                              ? "#FCF3CF"
                              : complaint.status === "reviewed"
                                ? "#D6EAF8"
                                : "#D5F5E3",
                          color:
                            complaint.status === "pending"
                              ? "#7D6608"
                              : complaint.status === "reviewed"
                                ? "#1B4F72"
                                : "#1A6E35",
                          padding: "3px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {complaint.status}
                      </span>
                    </td>

                    <td style={{ ...tdStyle, display: "flex", gap: "6px" }}>
                      <button
                        onClick={() => handleExpand(complaint.id)}
                        style={viewBtn}
                      >
                        {expandedId === complaint.id ? "Hide" : "View"}
                      </button>

                      {complaint.status === "pending" && (
                        <button
                          onClick={() => handleStatus(complaint.id, "reviewed")}
                          style={seenBtn}
                        >
                          Seen
                        </button>
                      )}

                      {complaint.status === "reviewed" && (
                        <button
                          onClick={() => handleStatus(complaint.id, "resolved")}
                          style={resolvedBtn}
                        >
                          Resolve
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(complaint.id)}
                        style={deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* Expanded row */}
                  {expandedId === complaint.id && (
                    <tr key={`${complaint.id}-expanded`}>
                      <td
                        colSpan="4"
                        style={{
                          padding: "12px 16px",
                          background: "#F7F5F2",
                          fontSize: "13px",
                          color: "#1C2333",
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        <strong>Complaint:</strong> {complaint.text}
                      </td>
                    </tr>
                  )}
                </>
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
const viewBtn = {
  background: "none",
  border: "1px solid #AED6F1",
  color: "#1B4F72",
  padding: "5px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "none",
  border: "1px solid #FADBD8",
  color: "#C0392B",
  padding: "5px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
};
const seenBtn = {
  background: "none",
  border: "1px solid #FCF3CF",
  color: "#7D6608",
  padding: "5px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
};

const resolvedBtn = {
  background: "none",
  border: "1px solid #D5F5E3",
  color: "#1A6E35",
  padding: "5px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
};
export default Complaints;
