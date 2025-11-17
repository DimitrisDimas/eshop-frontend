import type { Product } from "../app/models/product";

export const extractImageName = (item: Product): string | null =>{
    if(item && item.pictureUrl){
        const parts = item.pictureUrl.split('/');
        if(parts.length>0){
            return parts[parts.length-1];
        }
    }
    
    return null;
}

export const formatPrice = (price: number): string =>{
    return new Intl.NumberFormat('el-GR', {
        style:'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    }).format(price);
}