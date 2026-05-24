import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    siteName: "Nestify",
    maintenance: false,
    adminName: "Hasan",
    adminEmail: "hasan@email.com",
  });

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Site Settings Card */}
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>Site Settings</h2>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleChange("siteName", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="checkbox"
            checked={settings.maintenance}
            onChange={(e) => handleChange("maintenance", e.target.checked)}
            style={{ width: "16px", height: "16px", cursor: "pointer" }}
          />
          <label style={{ fontSize: "14px", color: "#1C2333" }}>
            Enable Maintenance Mode
          </label>
        </div>

        <button style={btnStyle}>Save Changes</button>
      </div>

      {/* Admin Account Card */}
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>Admin Account</h2>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Admin Name</label>
          <input
            type="text"
            value={settings.adminName}
            onChange={(e) => handleChange("adminName", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Admin Email</label>
          <input
            type="text"
            value={settings.adminEmail}
            onChange={(e) => handleChange("adminEmail", e.target.value)}
            style={inputStyle}
          />
        </div>

        <button style={btnStyle}>Save Changes</button>
      </div>
    </div>
  );
}
const cardStyle = {
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
  padding: "24px",
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const cardTitleStyle = {
  fontSize: "16px",
  color: "#1B4F72",
  marginBottom: "20px",
};

const btnStyle = {
  marginTop: "16px",
  padding: "10px 24px",
  background: "#1B4F72",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};
const labelStyle = {
  display: "block",
  fontSize: "13px",
  color: "#7A8299",
  marginBottom: "6px",
};
const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
};
export default Settings;
