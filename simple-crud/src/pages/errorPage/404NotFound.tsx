
import { useNavigate } from "react-router-dom";
import { Home, ArrowBack, SentimentDissatisfied } from "@mui/icons-material";
import { Mui } from "../../theme";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Mui.Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        p: 3,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <SentimentDissatisfied
        sx={{ fontSize: 100, color: "primary.main", mb: 2 }}
      />
      
      <Mui.Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: 700, mb: 2 }}>
        404
      </Mui.Typography>
      
      <Mui.Typography variant="h4" sx={{ mb: 3 }}>
        Oops! Page Not Found
      </Mui.Typography>
      
      <Mui.Typography variant="body1" sx={{ maxWidth: 500, mb: 4 }}>
        The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Mui.Typography>
      
      <Mui.Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Mui.Button
          variant="contained"
          size="large"
          startIcon={<Home />}
          onClick={() => navigate("/")}
          sx={{ px: 4 }}
        >
          Go to Homepage
        </Mui.Button>
        
        <Mui.Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ px: 4 }}
        >
          Go Back
        </Mui.Button>
      </Mui.Stack>
      
      <Mui.Typography variant="caption" sx={{ color: "text.secondary" }}>
        Need help? Contact our support team
      </Mui.Typography>
    </Mui.Box>
  );
};

export default NotFound;