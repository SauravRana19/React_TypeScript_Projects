import { useDispatch } from "react-redux";
import { setDrawerData, setIsDrawer } from "../../pages/Products/ProductSlice";
import { getProductById } from "../../pages/Products/service/ProductService";
import Mui from "../../theme/components/MuiComponent";

export interface CardProps {
  id?: string | number | undefined;
  title?: string;
  description?: string;
  price?: number;
  images?: string;
  category?: string;
  showBtn?:boolean
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  images,
  price,
  showBtn,
}) => {
  const dispatch = useDispatch();

  const viewCardDetails = async (id: string | number | undefined) => {
    if (id !== undefined) {
      const response = await getProductById(id);
      dispatch(setDrawerData(response));
      dispatch(setIsDrawer(true))
    }
  };

  return (
    <>
      <Mui.Card
        sx={{
          minWidth: 275,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 3,
          },
        }}
      >
        {images && (
          <Mui.CardMedia
            component="img"
            height="140"
            image={images}
            alt={title}
            sx={{ objectFit: "cover" }}
          />
        )}

        <Mui.CardContent sx={{ flexGrow: 1, cursor: "pointer" }}>
          <Mui.Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {title}
          </Mui.Typography>

          <Mui.Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 2,
            }}
          >
            {description}
          </Mui.Typography>

          {price && (
            <Mui.Typography variant="h6" color="primary">
              Price: ${price.toFixed(2)}
            </Mui.Typography>
          )}
        </Mui.CardContent>

        {showBtn ? <Mui.CardActions>
          <Mui.Button
            size="small"
            variant="contained"
            onClick={() => {
              viewCardDetails(id);
            }}
          >
            View Details
          </Mui.Button>
          {/* <Mui.Button size="small">Add to Cart</Mui.Button> */}
        </Mui.CardActions> : ''}
      </Mui.Card>
    </>
  );
};
