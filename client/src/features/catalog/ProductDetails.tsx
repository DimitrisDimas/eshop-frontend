import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Product } from "../../app/models/product";
import { useParams } from "react-router";
import axios from "axios";

export default function ProductDetails(){
    
    const {id} = useParams<{id:string}>() ;

    const [product, setProduct] = useState<Product | null>() ;
    const [loading, setLoading] = useState(true) ;

    useEffect( () => {
        
        axios.get(`http://localhost:8081/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));

    }, [id])

    if (loading) return <h3>Loading Product...</h3>
    if (!product) return <h3>Product not found</h3>

    return (
        <Typography variant="h2">Product Details</Typography>
    )
}