import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useNavItems,{ IList } from './NavItems'

const drawerWidth = 240;
    
export default function Headrer(){
    const [mobileOpen, setMobileOpen] = React.useState(false);  
    const navigate = useNavigate();
    const location = useLocation();
    const navItems = useNavItems();
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
            MUI
            </Typography>
            <Divider />
            <List>
            {navItems.map((item:IList,index) => (
                <ListItem key={`burger-item-${index}`} disablePadding>
                <ListItemButton onClick={()=>navigate(item.path)} sx={{ textAlign: 'center', bgcolor: location.pathname===item.path?'primary.light':''}}>
                    <ListItemText primary={item.label} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>
        );
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
                MUI
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item:IList,index) => (
                <Button key={`nav-menu-${index}`} sx={{ 
                    color: '#fff',
                    bgcolor: location.pathname===item.path?'primary.light':''
                }} onClick={()=>navigate(item.path)}>
                    {item.label}
                </Button>
                ))}
            </Box>
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
            {drawer}
            </Drawer>
        </nav>
    </Box>
    );
}

// function setMobileOpen(arg0: (prevState: any) => boolean) {
//     throw new Error("Function not implemented.");
// }
