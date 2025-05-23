import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      padding: "24px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    }}>
      <div style={{ fontSize: "100px", color: "#1976d2", marginBottom: "16px" }}>☹</div>
      
      <h1 style={{ fontSize: "4rem", fontWeight: 700, marginBottom: "16px" }}>
        404
      </h1>
      
      <h2 style={{ marginBottom: "24px" }}>
        Oops! Page Not Found
      </h2>
      

      
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
        <button
          style={{
            padding: "8px 24px",
            fontSize: "1rem",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onClick={() => navigate("/")}
        >
          <span>🏠</span> Go to Homepage
        </button>
        
        <button
          style={{
            padding: "8px 24px",
            fontSize: "1rem",
            backgroundColor: "transparent",
            color: "#1976d2",
            border: "1px solid #1976d2",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onClick={() => navigate(-1)}
        >
          <span>↩</span> Go Back
        </button>
      </div>
      
      <small style={{ color: "rgba(0, 0, 0, 0.6)" }}>
        Need help? Contact our support team
      </small>
    </div>
  );
};

export default NotFound;