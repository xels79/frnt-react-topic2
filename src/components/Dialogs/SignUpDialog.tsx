//import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {  Avatar, Button, ButtonGroup,
        CircularProgress, Dialog, DialogActions,
        DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IUser from '../../interfaces/IUserRedux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import IUserErrors from '../../interfaces/IUserErrors';
// import useAuth from '../../hooks/UseAuth';
import SignUpComponent from '../SignUpComponent/SignUpComponent'
import SigUpThunk from "../../store/slice/auth/SigUpThunk";
import useAppDispatch from '../../hooks/AppDispatch'
import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux';
// import { Navigate } from "react-router-dom";
import { redirectDone, resetSignUpSuccess } from '../../store/slice/auth/authSlice'
import { ISignUpUser } from "../../interfaces/IUserRedux";

export default function SignUpDialog({open,handleClose=()=>{console.log('close click')}}:{
    open:boolean,
    handleClose:()=>void
}){
    const showBusy = useSelector((state:RootState)=>state.auth.pending);
    const isLoggetIn = useSelector((state:RootState)=>state.auth.user !== null);
    const isSignUpSuccess = useSelector((state:RootState)=>state.auth.isSignUpSuccess);
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
        dispatch(SigUpThunk({
            user:data as ISignUpUser,
            redirectTo:'/boards'
        }));
    };
    useEffect(()=>{
        if (errors){
            errors.forEach(({ name, type, message }) => setError(name as 'password'|'username', {type, message}));
        }
        if (redirectTo){
            navigate(redirectTo, {replace:true});
            dispatch(redirectDone());
        }
        if (isSignUpSuccess){
            reset();
            dispatch(resetSignUpSuccess());
        }
        },[errors, redirectTo, isSignUpSuccess]);

    return (
        <>{!isLoggetIn &&
        <FormProvider {... methods}>
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
                    Регистрация
                </DialogContentText>
            </DialogTitle>
            <DialogContent>
            <SignUpComponent />
            {/* </Box> */}
            </DialogContent>
            <DialogActions sx={{m:2}}>
                <ButtonGroup color="primary" size="small">
                    <Button onClick={handleClose} variant="outlined" color="secondary">Отмена</Button>
                    <Button type="submit" disabled={showBusy} variant="contained">
                        {showBusy && <CircularProgress size={24} />}
                        {!showBusy && "Зарегистрироваться"}
                    </Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
        </FormProvider>}</>
    );
}