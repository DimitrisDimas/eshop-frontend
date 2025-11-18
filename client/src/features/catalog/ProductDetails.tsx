import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Product } from "../../app/models/product";
import { useParams } from "react-router";
import { extractImageName, formatPrice } from "../../utils/Formatters";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFoundError";
import Spinner from "../../app/layout/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails(){
    
    const { basket } = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();
    
    const {id} = useParams<{id: string}>() ;

    const [product, setProduct] = useState<Product | null>() ;
    const [loading, setLoading] = useState(true) ;
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i=> i.id === product?.id);

    useEffect( () => {

        /*
        axios.get(`http://localhost:8081/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));

        */

        if (!id) return;

        agent.Store.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));

    }, [id])

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const updateQuantity = async () => {
        try {
            setSubmitting(true);
            const newItem = {
                ...product!,
                quantity: quantity
            };

            if (item) {
                const quantityDifference = quantity - item.quantity;
                if (quantityDifference > 0) {
                    // Increment the quantity of an existing item in the basket
                    await agent.Basket.incrementItemQuantity(item.id, quantityDifference, dispatch);
                } else if (quantityDifference < 0) {
                    // Decrement the quantity of an existing item in the basket
                    await agent.Basket.decrementItemQuantity(item.id, Math.abs(quantityDifference), dispatch);
                }
            } else {
                // Add a new item to the basket
                await agent.Basket.addItem(newItem, dispatch);
            }
            setSubmitting(false);
        } catch (error) {
            console.error("Failed to update quantity:", error);
            // Handle error
            setSubmitting(false);
        }
    };

    if(loading) return <Spinner message='Loading Product...'/>
    if (!product) return <NotFound/>

    return (
        <Grid container spacing={6}>
            <Grid size={{ xs: 6}}>
                <img src={"/images/products/"+extractImageName(product)} alt={product.name} style={{ width: '100%' }}/>
            </Grid>
            
            <Grid size={{ xs: 6}}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb:2 }}/>
                <Typography gutterBottom color='secondary' variant="h4">{formatPrice(product.price)}</Typography>
                
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.productType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.productBrand}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
        </Grid>
    )
}