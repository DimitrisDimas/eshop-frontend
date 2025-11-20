import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid } from "@mui/material";
import { Link } from "react-router";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from "../../app/store/configureStore";
import { signUpUser } from "./accountSlice";
import { toast } from "react-toastify";

export default function RegisterPage(){

    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        
        try{
            //dispatching the sign in action
            await dispatch(signUpUser(formData));
            
        }catch(error){
            console.log('Error signing in:', error);
            toast.error('Sign in Failed. Please try again');
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            
            <Typography component="h1" variant="h5">
                Register
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={formData.username}
                    onChange={handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid>
                        <Link to="/login">
                            <Typography variant="body2">
                                Already have an account? Sign in
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>

            </Box>
          </Box>
        </Container>    
    )
}