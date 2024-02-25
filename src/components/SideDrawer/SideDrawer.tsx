import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText }  from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useNavItems,{ IList } from '../../constats/NavItems'
import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux';
import { showSignIn, showSignUp } from '../../store/slice/auth/authSlice'
import useAppDispatch from "../../hooks/AppDispatch";
type SideDrawerProps ={
    handleDrawerToggle:()=>void,
    brandName:string
};
export const SideDrawer=({handleDrawerToggle, brandName}:SideDrawerProps)=>{
    const user = useSelector((state:RootState)=>state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navItems = useNavItems(
        user?(user.firstName+' '+user.lastName?.substring(0,1).toUpperCase()+'.'):'',
    );
    const location = useLocation();
    return <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    <Typography variant="h6" sx={{ my: 2 }}>{brandName}</Typography>
    <Divider />
    <List>
    {navItems.map((item:IList,index) => (
        <ListItem key={`burger-item-${index}`} disablePadding>
        <ListItemButton
            onClick={()=>{
                if (item.path === '/Login'){
                    dispatch(showSignIn());
                }else if (item.path === '/signup'){
                    dispatch(showSignUp());
                }else{
                    navigate(item.path);
                }
            }}
            sx={{ textAlign: 'center', bgcolor: location.pathname===item.path?'primary.light':''}}
            disabled={location.pathname===item.path || item.disabled}
        >
            <ListItemText primary={item.label} />
        </ListItemButton>
        </ListItem>
    ))}
    </List>
    </Box>
}