import { AppBar, Switch, Toolbar, Typography} from "@mui/material";
const navLinks = [
    {title: 'Home', path:'/'},
    {title: 'Store', path:'/store'},
    {title: 'Contact', path:'/contact'}
]

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void ;
}

export default function Header({darkMode, handleThemeChange}: Props){
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar sx={({
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center"
            })}>
                
                <Box display='flex' alignItems='center'>
                    <Typography variant="h6">
                        Koutsianikoulis Sport
                    </Typography>

                <Switch checked={darkMode} onChange={handleThemeChange}/>

            </Toolbar>
        </AppBar>
    )
}