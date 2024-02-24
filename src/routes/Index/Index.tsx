import { Button, ButtonGroup, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import SignUpDialog from '../../components/Dialogs/SignUpDialog';
// import SignInDialog from '../../components/Dialogs/SignInDialog'
import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux';
import { showSignIn, showSignUp } from '../../store/slice/auth/authSlice'
import useAppDispatch from '../../hooks/AppDispatch';
export default function Index(){
    //const auth=useAuth();
    const userInfo = useSelector((state:RootState)=>state.auth.user?(state.auth.user?.lastName+ ' ' +state.auth.user.firstName?.substring(0,1)):'');
    // const [showSignUp,setShowSignUp] = useState<boolean>(false);
    // const [showSignIn,setShowSignIn] = useState<boolean>(false);
    const isLogin = useSelector((state:RootState)=>state.auth.user !== null);
    const dispatch = useAppDispatch();
    // useEffect(()=>{
    //     if (isLogin){
    //         setShowSignIn(false);
    //     }
    // },[isLogin]);
    return <>
        {!isLogin &&
            <ButtonGroup color="primary">
                <Button onClick={()=>{dispatch(showSignUp())}}>Зарегистрироваться</Button>
                {!isLogin && <Button onClick={()=>{dispatch(showSignIn())}}>Войти</Button>}
            </ButtonGroup>
        }
        {isLogin && <Typography>Вы вошли как "{userInfo}"</Typography>}
        {/* <SignUpDialog open={showSignUp} handleClose={()=>{setShowSignUp(false)}} />
        <SignInDialog open={showSignIn} handleClose={()=>{setShowSignIn(false)}} /> */}
    </>
}