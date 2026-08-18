import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { getToken } from "../utils/auth";

function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [listingsList, setListingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  // Delete listing by id
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/api/Properties/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setListingsList(listingsList.filter((l) => l._id !== id));
      })
      .catch((err) => console.log(err.response));
  };

  // run filters before rendering
  const filtered = listingsList
    .filter((listing) => {
      if (statusFilter === "all") return true;
      return listing.status === statusFilter;
    })
    .filter((listing) => {
      return listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/Properties`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setListingsList(res.data.data.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setError("Failed to load listings.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p style={{ padding: "24px", color: "#7A8299" }}>Loading listings...</p>
    );
  if (error)
    return <p style={{ padding: "24px", color: "#C0392B" }}>{error}</p>;

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 14px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
          }}
        />

        {/* Filter Btns */}
        {["all", "available", "sold", "rented"].map((s) => (
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
        {/* Empty State */}
        {filtered.length === 0 && (
          <p
            style={{ textAlign: "center", color: "#7A8299", padding: "32px 0" }}
          >
            No listings matches your search.
          </p>
        )}

        {filtered.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{ borderBottom: "2px solid #f0f0f0", textAlign: "left" }}
              >
                <th style={thStyle}>Title</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((listing) => (
                <tr
                  key={listing._id}
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <td style={tdStyle}>{listing.title}</td>
                  <td style={tdStyle}>{listing.city}</td>
                  <td style={tdStyle}>${listing.price.toLocaleString()}</td>
                  <td style={tdStyle}>{listing.purpose}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          listing.status === "available"
                            ? "#D5F5E3"
                            : listing.status === "sold"
                              ? "#FADBD8"
                              : "#FCF3CF",
                        color:
                          listing.status === "available"
                            ? "#1A6E35"
                            : listing.status === "sold"
                              ? "#C0392B"
                              : "#7D6608",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(listing._id)}
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
                    <button
                      onClick={() => setSelectedListing(listing)}
                      style={{
                        background: "none",
                        border: "1px solid #AED6F1",
                        color: "#1B4F72",
                        padding: "5px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        cursor: "pointer",
                        marginLeft: "6px",
                      }}
                    >
                      Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Info Card Modal */}
      {selectedListing && (
        <div
          onClick={() => setSelectedListing(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "28px",
              width: "480px",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedListing(null)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#7A8299",
              }}
            >
              ✕
            </button>

            {/* Header */}
            <h2
              style={{
                fontSize: "16px",
                color: "#1B4F72",
                marginBottom: "4px",
                paddingRight: "24px",
              }}
            >
              {selectedListing.title}
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#7A8299",
                marginBottom: "20px",
              }}
            >
              {selectedListing.address}
            </p>

            {/* Price + Status Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#1B4F72",
                }}
              >
                ${selectedListing.price.toLocaleString()}
                <span
                  style={{
                    fontSize: "13px",
                    color: "#7A8299",
                    fontWeight: "400",
                  }}
                >
                  {" "}
                  / {selectedListing.purpose}
                </span>
              </span>
              <span
                style={{
                  background:
                    selectedListing.status === "available"
                      ? "#D5F5E3"
                      : selectedListing.status === "sold"
                        ? "#FADBD8"
                        : "#FCF3CF",
                  color:
                    selectedListing.status === "available"
                      ? "#1A6E35"
                      : selectedListing.status === "sold"
                        ? "#C0392B"
                        : "#7D6608",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {selectedListing.status}
              </span>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {[
                { label: "Bedrooms", value: selectedListing.bedRooms },
                { label: "Bathrooms", value: selectedListing.bathRooms },
                { label: "Area", value: `${selectedListing.area} m²` },
                { label: "Category", value: selectedListing.category },
                { label: "City", value: selectedListing.city },
                { label: "Views", value: selectedListing.views },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "#F7F5F2",
                    borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#7A8299",
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#1B4F72",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "#7A8299",
                  fontWeight: "600",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Description
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#1C2333",
                  lineHeight: "1.7",
                }}
              >
                {selectedListing.description || "No description provided."}
              </p>
            </div>

            {/* Dates */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                borderTop: "1px solid #f0f0f0",
                paddingTop: "14px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", color: "#7A8299" }}>Listed</div>
                <div style={{ fontSize: "12px", color: "#1C2333" }}>
                  {new Date(selectedListing.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", color: "#7A8299" }}>
                  Last Updated
                </div>
                <div style={{ fontSize: "12px", color: "#1C2333" }}>
                  {new Date(selectedListing.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "11px", color: "#7A8299" }}>Likes</div>
                <div style={{ fontSize: "12px", color: "#1C2333" }}>
                  {selectedListing.likes}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
export default Listings;
