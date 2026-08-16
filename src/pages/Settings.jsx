import { useState, useEffect } from "react";
import axios from "axios";
import { removeToken, getToken, getUser } from "../utils/auth";
import { BASE_URL } from "../config";

function Settings() {
  const [settings, setSettings] = useState({
    siteName: "Nestify",
    maintenance: false,
    adminName: "Hasan",
    adminEmail: "hasan@email.com",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/users/myProfile`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        console.log(res.data);
        const user = res.data.data.profile;
        setSettings((prev) => ({
          ...prev,
          adminName: `${user.firstName} ${user.lastName}`,
          adminEmail: user.email,
        }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSaveAdmin = () => {
    setSaving(true);
    setSaveMsg("");
    const user = getUser();
    const [firstName, ...rest] = settings.adminName.trim().split(" ");
    const lastName = rest.join(" ") || firstName;

    axios
      .patch(
        `${BASE_URL}/api/users/${user.id}`,
        { firstName, lastName, email: settings.adminEmail },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      )
      .then(() => {
        setSaveMsg("Saved successfully.");
        setSaving(false);
      })
      .catch(() => {
        setSaveMsg("Failed to save. Try again.");
        setSaving(false);
      });
  };

  if (loading)
    return (
      <p style={{ padding: "24px", color: "#7A8299" }}>Loading settings...</p>
    );

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

        <p style={{ fontSize: "12px", color: "#7A8299", marginTop: "10px" }}>
          * Site settings are UI only — backend support coming in a future
          version.
        </p>

        <button
          style={{ ...btnStyle, opacity: 0.5, cursor: "not-allowed" }}
          disabled
        >
          Save Changes
        </button>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={{ ...btnStyle, opacity: saving ? 0.6 : 1 }}
            onClick={handleSaveAdmin}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          {saveMsg && (
            <p
              style={{
                fontSize: "13px",
                color: saveMsg.includes("success") ? "#1A6E35" : "#C0392B",
                marginTop: "8px",
              }}
            >
              {saveMsg}
            </p>
          )}
          <button
            style={{ ...btnStyle, background: "#C0392B", marginTop: "12px" }}
            onClick={() => {
              removeToken();
              window.location.href = "/login";
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
const cardStyle = {
  background: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: "10px",
  padding: "24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
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
