import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import useAuth from '../../hooks/UseAuth';
import IUser from '../../interfaces/IUser'
import IUserErrors from '../../interfaces/IUserErrors'
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IUser>();
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
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    // name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Имя"
                    autoFocus
                    {...register("firstName",{
                        required:{
                            value:true,
                            message:'Поле "Имя" должнобыть заполнено'
                        }
                    })}
                    error={typeof(errors.firstName)==='object'}
                    helperText={typeof(errors.firstName)==='object'?errors.firstName.message:''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Фамилия"
                    autoComplete="family-name"
                    {...register("lastName",{
                        required:{
                            value:true,
                            message:'Поле "Фамилия" должнобыть заполнено'
                        }
                    })}
                    error={typeof(errors.lastName)==='object'}
                    helperText={typeof(errors.lastName)==='object'?errors.lastName.message:''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    label="Имя пользователя"
                    {...register("username",{
                        required:{
                            value:true,
                            message:'Поле "Имя пользователя" должнобыть заполнено'
                        }
                    })}
                    error={typeof(errors.username)==='object'}
                    helperText={typeof(errors.username)==='object'?errors.username.message:''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    {...register("email",{
                        required:{
                            value:true,
                            message:'Поле "Email" должнобыть заполнено'
                        },
                        pattern:{
                            value:/^[^.][A-Z0-9._%+-]+@[A-Z0-9-]+\.{1}[A-Z]{2,4}$/i,
                            message:'Формат поля "Email" должен соответствовать e-mail адресу'
                        }
                    })}
                    error={typeof(errors.email)==='object'}
                    helperText={typeof(errors.email)==='object'?errors.email.message:''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password",{
                        required:{
                            value:true,
                            message:'Поле "Пароль" должнобыть заполнено'
                        },
                        minLength:{
                            value:8,
                            message:'Поле "Пароль" должнобыть не менее 8-и символов'
                        }
                    })}
                    error={typeof(errors.password)==='object'}
                    helperText={typeof(errors.password)==='object'?errors.password.message:''}
                    />
                </Grid>
                </Grid>
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
                {auth.userCount()>0 &&
                <>
                    <Grid container justifyContent="flex-end">
                        <Grid item>Уже есть акаунт <Link onClick={()=>navigate('/login',{ replace: true })} variant="body2">войти</Link>?</Grid>
                    </Grid>
                </>}
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}