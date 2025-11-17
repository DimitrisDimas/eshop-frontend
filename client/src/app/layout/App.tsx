import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import Header from "./Header"
import { useEffect, useState } from "react"
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../store/configureStore";
import agent from "../api/agent";
import { setBasket } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { getBasketFromLocalStorage } from "../../utils/util";
import Spinner from "./Spinner";

function App() { 
  const [darkMode, setDarkMode] = useState(false) ;
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const paletteType = darkMode ? 'dark' : 'light';

  useEffect(()=>{
      const basket = getBasketFromLocalStorage();
      dispatch(fetchCurrentUser());
      
      if(basket){
        agent.Basket.get()
          .then(basket=>dispatch(setBasket(basket)))
          .catch(error=>console.log(error))
          .finally(()=>setLoading(false))
      }else{
        //setLoading(false);
        setTimeout(() => setLoading(false), 0)
      }
  })

  const theme = createTheme({
      palette:{
        mode: paletteType,
      }
  })

  function handleThemeChange(){
      setDarkMode(!darkMode) ;
  }

  if(loading)return <Spinner message="Getting Basket..."/>

  return (
      <>
        <ThemeProvider theme={theme}>
          <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
          <CssBaseline/>

          <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
          
          <Container sx={{ paddingTop: "64px" }}>
            <Outlet/>
          </Container>
          
        </ThemeProvider>
      </>      
  )
}

export default App