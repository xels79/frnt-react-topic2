import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText }  from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useNavItems,{ IList } from '../../constats/NavItems'
import useAuth from '../../hooks/UseAuth';
type SideDrawerProps ={
    handleDrawerToggle:()=>void,
    brandName:string
};
export const SideDrawer=({handleDrawerToggle, brandName}:SideDrawerProps)=>{
    const auth = useAuth();
    const navigate = useNavigate();
    const navItems = useNavItems(auth.user?auth.user.username:'');
    const location = useLocation();
    return <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    <Typography variant="h6" sx={{ my: 2 }}>{brandName}</Typography>
    <Divider />
    <List>
    {navItems.map((item:IList,index) => (
        <ListItem key={`burger-item-${index}`} disablePadding>
        <ListItemButton
            onClick={()=>navigate(item.path)}
            sx={{ textAlign: 'center', bgcolor: location.pathname===item.path?'primary.light':''}}
            disabled={location.pathname===item.path}
        >
            <ListItemText primary={item.label} />
        </ListItemButton>
        </ListItem>
    ))}
    </List>
    </Box>
}