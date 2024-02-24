import { Navigate} from 'react-router-dom'
import { useEffect } from 'react';
import useAppDispatch from '../../hooks/AppDispatch';
import LogoutThunk from '../../store/slice/auth/LogoutThunk';
import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux';
import style from './logout.module.scss'
import { Box } from '@mui/material';
export default function Logout(){
    const dispatch = useAppDispatch();
    const user = useSelector((state:RootState)=>state.auth.user);
    const isLoggetIn = user !== null;
    
    useEffect(()=>{
        if ( user ){
            dispatch(LogoutThunk(null));
        }
    });

    return <>
        {!isLoggetIn && <Navigate to="/"/>}
        {isLoggetIn && <Box sx={{width:'100%'}}><p>Выход</p><span className={style.loader}></span></Box>}
    </>;
}