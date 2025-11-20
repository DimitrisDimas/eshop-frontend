import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../errors/NotFoundError";
import ServerError from "../errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";
import SignInPage from "../../features/account/SignInPage";
import RegisterPage from "../../features/account/RegisterPage";
import RequireAuth from "./RequireAuth";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Order from "../../features/orders/Order";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                element: <RequireAuth/>, children:[
                    {path:'checkout', element:<CheckoutPage/>},
                    {path:'orders', element:<Order/>},
                ]
            },
            {path:'', element:<Catalog/>},
            {path:'store', element:<Catalog/>},
            {path:'store/:id', element:<ProductDetails/>},
            {path:'basket', element:<BasketPage/>},
            {path:'login', element:<SignInPage/>},
            {path:'register', element:<RegisterPage/>},
            {path:'not-found', element:<NotFound/>},
            {path:'server-error', element:<ServerError/>},
            {path:'*', element:<Navigate replace to='/not-found'/>}
        ]
    }
])
