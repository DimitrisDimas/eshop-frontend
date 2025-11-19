import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router";
import { logOut } from "../../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function SignedInMenu(){
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=>state.account);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); 
    const open = Boolean(anchorEl);
    
    const handleClick=(event: React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>{
        setAnchorEl(null);
    }

    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                sx={{typography:'h6'}}
                >
                Hi, {user?.username}
            </Button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}> 
                <MenuItem component={Link} to="/orders">My Orders</MenuItem>
                <MenuItem onClick={()=>dispatch(logOut())}>Logout</MenuItem>
            </Menu>
        </>
    );
}