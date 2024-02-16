
import * as React from 'react';
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
import { useLocation, useNavigate, useHref } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const [uNameError, setUNameError]=React.useState('');
    const [passwordError, setPasswordError]=React.useState('');
    const from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        if (!username){
            setUNameError("Имя пользователя олжно быть указано");
            return;
        }else{
            setUNameError('');
        }
        if (!password){
            setPasswordError("Пароль долженбыть указан");
            return;
        }else{
            setPasswordError("");
        }
        auth.signin(username, password, (isLoggedIn:boolean, message?:string) => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            if (isLoggedIn){
                navigate(from, { replace: true });
            }else{
                if (message){
                    setPasswordError(message);
                    setUNameError(message);
                }else{
                    setPasswordError("Неправильное имя пользователя или пароль!");
                    setUNameError("Неправильное имя пользователя или пароль!");
                }
            }
        });
    }

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
                    Вход
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required={true}
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={uNameError!==''}
                    helperText={uNameError}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={passwordError!==''}
                    helperText={passwordError}
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Box textAlign="right">Нет акаунта <Link href={useHref('/signup')} variant="body2">зарегистрируйтесь.</Link></Box>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
    );
}