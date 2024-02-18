
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { useForm, SubmitHandler } from "react-hook-form"
import IUser from '../../interfaces/IUser'
import IUserErrors from '../../interfaces/IUserErrors';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    // const [uNameError, setUNameError]=React.useState('');
    // const [passwordError, setPasswordError]=React.useState('');
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<IUser>();
    const onSubmit: SubmitHandler<IUser> = (data) => {
        auth.signin(data.username, data.password, (isLoggedIn:boolean, _errors:IUserErrors[] | null)=>{
            if (isLoggedIn){
                navigate(from, { replace: true });
            }else{
                if (_errors){
                    _errors.forEach(({ name, type, message }) => setError(name, {type, message}));
                }else{
                    console.error('Неизвестная ошибка.');
                }
            }
        });
    }

return (
    <>
    {auth.userCount()>0 &&
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
                    Вход
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required={true}
                    fullWidth
                    id="username"
                    label="username"
                    autoComplete="username"
                    autoFocus
                    {...register("username",{
                        required:{
                            value:true,
                            message:'Поле "Имя пользователя" должнобыть заполнено'
                        }
                    })}
                    error={typeof(errors.username)==='object'}
                    helperText={typeof(errors.username)==='object'?errors.username.message:''}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password",{
                        required:{
                            value:true,
                            message:'Поле "Пароль" должнобыть заполнено'
                        },
                    })}
                    error={typeof(errors.password)==='object'}
                    helperText={typeof(errors.password)==='object'?errors.password.message:''}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Box textAlign="right">Нет акаунта <Link href="#" onClick={()=>navigate('/signup',{ replace: true })} variant="body2">зарегистрируйтесь.</Link></Box>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
    }
    {!auth.userCount() && <Navigate to='/signup'/>}
    </>
    );
}