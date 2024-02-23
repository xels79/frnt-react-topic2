import { Button, ButtonGroup, Typography } from "@mui/material";
import useAuth from "../../hooks/UseAuth";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUpDialog from '../../components/Dialogs/SignUpDialog';
import SignInDialog from '../../components/Dialogs/SignInDialog'
export default function Index(){
    const auth=useAuth();
    const userInfo = auth.user?(auth.user?.lastName+ ' ' +auth.user.firstName?.substring(0,1)):'';
    const [showSignUp,setShowSignUp] = useState<boolean>(false);
    const [showSignIn,setShowSignIn] = useState<boolean>(false);
    const [isLogin,setIslogin] = useState<boolean>(false);
    useEffect(()=>{
        console.log("start check");
        auth.checkStatus((user)=>{
            console.log("end check");
            if(user){
                setIslogin(true);
            }
        });
    });
    return <>
        {/* {!auth.user &&
            <ButtonGroup color="primary">
                <Button onClick={()=>navigate('/signup')}>Зарегистрироваться</Button>
                {auth.userCount()>0 && <Button onClick={()=>navigate('/login')}>Войти</Button>}
            </ButtonGroup>
        } */}
        {!isLogin &&
            <ButtonGroup color="primary">
                <Button onClick={()=>{setShowSignUp(true)}}>Зарегистрироваться</Button>
                {auth.userCount()>0 && <Button onClick={()=>{setShowSignIn(true)}}>Войти</Button>}
            </ButtonGroup>
        }
        {isLogin && <Typography>Вы вошли как "{userInfo}"</Typography>}
        <SignUpDialog open={showSignUp} handleClose={()=>{setShowSignUp(false)}} />
        <SignInDialog open={showSignIn} handleClose={()=>{setShowSignIn(false)}} />
    </>
}