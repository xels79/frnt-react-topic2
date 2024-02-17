import { Box, Button }  from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useNavItems,{ IList } from '../../constats/NavItems'
import useAuth from '../../hooks/UseAuth';
export default function HeaderNav(){
    const auth = useAuth();
    const navigate = useNavigate();
    const navItems = useNavItems(auth.user?(auth.user.lastName+' '+auth.user.firstName?.substring(0,1).toUpperCase()+'.'):'');
    const location = useLocation();
    return <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {navItems.map((item:IList,index) => (
        <Button key={`nav-menu-${index}`} sx={{ 
            color: '#fff',
            bgcolor: location.pathname===item.path?'primary.light':''
        }} onClick={()=>navigate(item.path)} disabled={location.pathname===item.path || item.disabled}>
            {item.label}
        </Button>
        ))}
    </Box>
}