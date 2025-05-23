import { useNavigate } from "react-router-dom";
import Mui from "../../../theme/components/muiComponent";
import "../style/home.css";

export const HomeView = () => {
  const navigate = useNavigate();
  const changeRoute = () => {
    navigate("/products");
  };
  return (
    <Mui.Container fixed maxWidth="xl" className="home-layout">
      <Mui.Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
        }}
      >
        Your Destination for Quality Finds
      </Mui.Typography>

      <Mui.Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: "primary.main",
        }}
      >
        Trending Shop
      </Mui.Typography>

      <Mui.Typography
        variant="h6"
        sx={{
          mb: 4,
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        Welcome to Trending Shop, where every product tells a story. From
        handpicked items to the latest trends!
      </Mui.Typography>

      <Mui.Box sx={{ textAlign: "center" }}>
        <Mui.Button
          variant="outlined"
          size="large"
          sx={{
            m: 3,
            fontWeight: "bold",
            borderColor: "black",
            color: "black",
          }}
          onClick={changeRoute}
        >
          EXPLORE OUR PRODUCTS
        </Mui.Button>
      </Mui.Box>
    </Mui.Container>
  );
};
