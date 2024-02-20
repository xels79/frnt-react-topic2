import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import useAuth from '../../hooks/UseAuth';
import IUser from '../../interfaces/IUser'
import IUserErrors from '../../interfaces/IUserErrors'
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import SignUpComponent from '../../components/SignUpComponent/SignUpComponent';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const methods = useForm<IUser>();
    const {
        handleSubmit,
        setError,
    } = methods;
    const navigate = useNavigate();
    const auth = useAuth();
    const [showBusy, setBusy] = useState(false);
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
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Регистрация
            </Typography>
            <FormProvider {...methods}>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <SignUpComponent />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={showBusy}
                    >
                    {showBusy && <CircularProgress size={24} />}
                    {!showBusy && "Зарегистрироваться"}
                    </Button>
                </Box>
            </FormProvider>
            </Box>
        </Container>
        </ThemeProvider>
    );
}