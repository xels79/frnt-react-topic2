import { Box, Button }  from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useNavItems,{ IList } from '../../constats/NavItems'
import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux';
import { showSignIn, showSignUp } from '../../store/slice/auth/authSlice'
import useAppDispatch from "../../hooks/AppDispatch";

export default function HeaderNav(){
    const navigate = useNavigate();
    const user = useSelector((state:RootState)=>state.auth.user);
    const dispatch = useAppDispatch();
    const navItems = useNavItems(
        user?(user.lastName+' '+user.firstName?.substring(0,1).toUpperCase()+'.'):'',
    );
    const location = useLocation();
    return <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {navItems.map((item:IList,index) => 
        <Button key={`nav-menu-${index}`} sx={{ 
                color: '#fff',
                bgcolor: location.pathname===item.path?'primary.light':''
            }} onClick={()=>{
                    if (item.path === '/Login'){
                        dispatch(showSignIn())
                    }else if (item.path === '/signup'){
                        dispatch(showSignUp())
                    }else{
                        navigate(item.path)
                    }
            }} disabled={location.pathname===item.path || item.disabled}>
                    {item.label}
            </Button>
        )}
    </Box>
}