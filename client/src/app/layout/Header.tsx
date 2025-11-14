import { AppBar, Toolbar, Typography} from "@mui/material";

export default function Header(){
    return (
        <AppBar position="static" sc={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">
                    Koutsianikouslis Sport
                </Typography>
            </Toolbar>
        </AppBar>
    )
}