import { Grid } from "@mui/material";
import type { Product } from "../../app/models/product";

interface Props{
    products: Product[];
}

export default function ProductList({products}: Props){
    return (
        <Grid container spacing={4}>
            {products.map((product) => {
                <ProductCard product={product}/>
            })}
        </Grid>
    )

}