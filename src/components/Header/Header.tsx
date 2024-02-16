import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import HeaderNav from '../HeaderNav/HeaderNav'
import {SideDrawer} from "../SideDrawer/SideDrawer";

const drawerWidth = 240;
const brandName = 'Brand';
    
export default function Header(){
    const [mobileOpen, setMobileOpen] = React.useState(false);  
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign:"left" }}
                >
                    {brandName}
                </Typography>
                <HeaderNav />
            </Toolbar>
        </AppBar>
        <nav>
            <Drawer
            //container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            >
                <SideDrawer handleDrawerToggle={handleDrawerToggle} brandName={brandName}/>
            </Drawer>
        </nav>
    </Box>
    );
}
