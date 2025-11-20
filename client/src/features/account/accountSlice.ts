import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import type { User } from "../../app/models/user";
import type { FieldValues } from "react-hook-form";

interface AccountState {
    user: User | null;
    error: string | null;
}

const initialState: AccountState = {
    user: null,
    error: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'auth/login',
    async (data, thunkAPI) => {
        try{
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue({ error: error.message });
            }
            return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
        }
    }
)

export const signUpUser = createAsyncThunk<User, FieldValues>(
    'auth/register',
    async (data, thunkAPI) => {
        try{
            const user = await agent.Account.register(data);
            localStorage.setItem('user', JSON.stringify(user));
            console.log("created"+user);
            return user;
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue({ error: error.message });
            }
            return thunkAPI.rejectWithValue({ error: 'An unknown error occurred' });
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User | null>(
    'auth/fetchCurrentUser',
    async() =>{
        try{
            //Retrieve user data from local storage
            const userString = localStorage.getItem('user');
            if(userString){
                const user = JSON.parse(userString) as User;
                return user;
            }
            return null;
        }
        catch(error){
            console.error("Error Fetching current User:", error);
            return null;
        }
    }
)

export const logoutUser = createAsyncThunk<void>(
    'auth/logout',
    async() =>{
        try{
            //Remove user from local storage
            localStorage.removeItem('user');
        }
        catch(error){
            console.error("Error logging out user: " + error);
        }
    }
)

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
            router.navigate('/');
        }, clearError:(state)=>{
            state.error = null;
        }
    },
    extraReducers:(builder=>{
        builder.addMatcher(isAnyOf(signInUser.fulfilled), (state, action)=>{
            state.user = action.payload;
            state.error = null;
            toast.success('Sign in successful');
        });
        
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected, logoutUser.fulfilled), (state, action)=>{
            const payload = action.payload as string | null;
            state.error = payload;
            toast.success('Sign in failed. Please try again');
        });

        builder.addMatcher(isAnyOf(signUpUser.fulfilled), (state, action)=>{
            state.user = action.payload;
            state.error = null;
            toast.success('Register successful. Please Log in');
        });

        builder.addMatcher(isAnyOf(signUpUser.rejected), (state, action)=>{
            const payload = action.payload as string | null;
            state.error = payload;
            toast.success('Register failed. Please try again');
        });
    })
})
export const {logOut, clearError} = accountSlice.actions;