import { Card } from "../../../components/CommonCard/Card";
import Mui from "../../../theme/components/MuiComponent";
import { ProductDrawer } from "./ProductDrawer";

interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
}

interface ProductCardProps {
  data: Product[];
}

export const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <>
      <Mui.Grid container spacing={3} sx={{ margin: 3 }}>
        {data.map((product: any) => (
          <Mui.Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card
              id={product.id}
              title={product.title}
              description={product.description}
              images={product.images}
              price={product.price}
              showBtn={true}
            />
          </Mui.Grid>
        ))}
      </Mui.Grid>
      <Mui.Box>
        <ProductDrawer />
      </Mui.Box>
    </>
  );
};
