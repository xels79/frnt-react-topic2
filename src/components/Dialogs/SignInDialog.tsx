//import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, ButtonGroup,
        CircularProgress, Dialog, DialogActions,
        DialogContent,DialogContentText,
        DialogTitle } from '@mui/material';
import IUser from '../../interfaces/IUserRedux';
import { useEffect } from 'react';
import SignUpComponent from '../SignInComponent/SignInComponent'

import LoginThunk from '../../store/slice/auth/LoginThunk';
import useAppDispatch from '../../hooks/AppDispatch'
import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux';
// import { Navigate } from "react-router-dom";
import { redirectDone, resetSignSuccess } from '../../store/slice/auth/authSlice'
import { useNavigate } from "react-router-dom";

export default function SignUpDialog({
    open,
    handleClose=()=>{console.log('close click')}
}:{
    open:boolean,
    handleClose:()=>void
}){
    const showBusy = useSelector((state:RootState)=>state.auth.pending);
    const isLoggetIn = useSelector((state:RootState)=>state.auth.user !== null);
    const isSignInSuccess = useSelector((state:RootState)=>state.auth.isSignInSuccess);
    const dispatch = useAppDispatch();
    const errors = useSelector((state:RootState)=>state.auth.errors);
    const methods = useForm<IUser>();
    const redirectTo = useSelector((state:RootState)=>state.auth.redirectTo);
    const navigate = useNavigate();
    const {
        handleSubmit,
        reset,
        setError,
    } = methods;
    const onSubmit: SubmitHandler<IUser> = (data) => {
        dispatch(LoginThunk({
            user:{
                username:data.username,
                password:data.password as string
            },
            redirectTo:'/boards'
        }))
    };
    useEffect(()=>{
        if (errors){
            errors.forEach(({ name, type, message }) => setError(name as 'password'|'username', {type, message}));
        }
        if (redirectTo){
            navigate(redirectTo, {replace:true});
            dispatch(redirectDone());
        }
        if (isSignInSuccess){
            reset();
            dispatch(resetSignSuccess());
        }
        },[errors, redirectTo, isSignInSuccess]);

    return (
        <>
        {!isLoggetIn &&
            <FormProvider {...methods}>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit:handleSubmit(onSubmit)
                }}
            >
                <DialogTitle sx={{textAlign:'center'}}>
                    <Avatar sx={{ m: '1rem auto', bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <DialogContentText  variant="body2">
                        Вход
                    </DialogContentText>
                </DialogTitle>
                <DialogContent>
                    <SignUpComponent />
                </DialogContent>
                <DialogActions sx={{m:2}}>
                    <ButtonGroup color="primary" size="small">
                        <Button onClick={handleClose} variant="outlined" color="secondary">Отмена</Button>
                        <Button type="submit" disabled={showBusy} variant="contained">
                            {showBusy && <CircularProgress size={24} />}
                            {!showBusy && "Войти"}
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
            </FormProvider>
        }
        {/* {(isLoggetIn && open) && <Navigate to="/boards" replace={true}/>} */}
        </>
    );
}