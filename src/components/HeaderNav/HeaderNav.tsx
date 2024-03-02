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
        user?(user.firstName+' '+user.lastName?.substring(0,1).toUpperCase()+'.'):'',
    );
    const location = useLocation();
    return <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {navItems.map((item:IList,index) => {
            const isActive = location.pathname===item.path || (item.path.length>1 && location.pathname.indexOf(item.path)>-1);
            // console.log(location.pathname);
            // console.log(item.path,location.pathname.length,location.pathname.indexOf(item.path));
        return <Button key={`nav-menu-${index}`} sx={{ 
                color: '#fff',
                bgcolor: isActive?'primary.light':''
            }} onClick={()=>{
                    if (item.path === '/Login'){
                        dispatch(showSignIn())
                    }else if (item.path === '/signup'){
                        dispatch(showSignUp())
                    }else{
                        navigate(item.path)
                    }
            }} disabled={isActive || item.disabled}>
                    {item.label}
            </Button>
        }
        )}
    </Box>
}