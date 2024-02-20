//import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {  Avatar, Button, ButtonGroup,
        CircularProgress, Dialog, DialogActions,
        DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IUser from '../../interfaces/IUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IUserErrors from '../../interfaces/IUserErrors';
import useAuth from '../../hooks/UseAuth';
import SignUpComponent from '../SignUpComponent/SignUpComponent'

export default function SignUpDialog({open,handleClose=()=>{console.log('close click')}}:{
    open:boolean,
    handleClose:()=>void
}){
    const [showBusy, setBusy] = useState(false);
    const navigate = useNavigate();
    const method = useForm<IUser>();
    const {
        handleSubmit,
        setError,
    } = method;
    const auth = useAuth();
    const onSubmit: SubmitHandler<IUser> = (data) => {
        setBusy(true);
        auth.signup(data, (isLoggetIn, _errors:IUserErrors[] | null)=>{
            if (isLoggetIn){
                navigate('/boards', { replace: true });
            }else{
                setBusy(false);
                if (_errors){
                    _errors.forEach(({ name, type, message }) => setError(name, {type, message}));
                }else{
                    console.error('Неизвестная ошибка.');
                }
            }
        })
    };

    return (
        <FormProvider {... method}>
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
        </FormProvider>
    );
}