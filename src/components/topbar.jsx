import { useLocation } from "react-router-dom";

function Topbar() {
  const location = useLocation();
  const titles = {
    "/": "Dashboard",
    "/Dashboard": "Dashboard",
    "/Listings": "Listings",
    "/Users": "Users",
  };
  console.log(location.pathname);
  const pageTitle = titles[location.pathname];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "18px", color: "#1B4F72" }}>
        {pageTitle}
      </h2>

      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "#1B4F72",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        HS
      </div>
    </div>
  );
}
export default Topbar;
