import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { setToken } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/api/users/login`, { email, password })
      .then((res) => {
        setToken(res.data.data.token); // save token to localStorage
        window.location.href = "/dashboard"; // redirect to dashboard
      })
      .catch(() => {
        setError("Invalid email or password.");
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F7F5F2",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "40px",
          width: "360px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#1B4F72", marginBottom: "8px", fontSize: "24px" }}>
          Nestify Admin
        </h1>
        <p style={{ color: "#7A8299", marginBottom: "32px", fontSize: "14px" }}>
          Sign in to your admin account
        </p>

        {error && (
          <p
            style={{ color: "#C0392B", fontSize: "13px", marginBottom: "16px" }}
          >
            {error}
          </p>
        )}

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="admin@nestify.com"
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#1B4F72",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

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

export default Login;
