import { Button, ButtonGroup, Typography } from "@mui/material";
import useAuth from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
export default function Index(){
    const auth=useAuth();
    const navigate=useNavigate();
    const userInfo = auth.user?(auth.user?.lastName+ ' ' +auth.user.firstName?.substring(0,1)):'';
    return <>
        {!auth.user &&
            <ButtonGroup color="primary">
                <Button onClick={()=>navigate('/signup')}>Зарегистрироваться</Button>
                {auth.userCount()>0 && <Button onClick={()=>navigate('/login')}>Войти</Button>}
            </ButtonGroup>
        }
        {!!auth.user && <Typography>Вы вошли как "{userInfo}"</Typography>}
    </>
}