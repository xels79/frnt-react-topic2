
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
// import {FakeAuthProvider} from '../../providers/FakeAuthProvider'
import SignInComponent from '../../components/SignInComponent/SignInComponent'
import { LoginChunk } from '../../store/slice/auth/authSlice';
import { IUserLogin } from '../../interfaces/IUserRedux';
import useAppDispatch from '../../hooks/AppDispatch'
// import { IUserLogin } from '../../interfaces/IUserRedux';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const auth = useAuth();
    // const [uNameError, setUNameError]=React.useState('');
    // const [passwordError, setPasswordError]=React.useState('');
    //const from = location.state?.from?.pathname || "/";
    const [showBusy, setBusy] = useState(false);
    const methods = useForm<IUserLogin>();
    const {
        handleSubmit,
    } = methods;
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<IUserLogin> = (data) => {
        setBusy(true);
        dispatch(LoginChunk({
            username:data.username,
            password:data.password
        }))
        // YII2AuthProvider.signin(data.username, data.password as string,(user:IUser| null, errors:IUserErrors[] | null)=>{
        //     console.log(user);
        //     setBusy(false);
        //     dispatch(setUser({errors:errors,user:user:'1'}))
            
        // });
        // auth.signin(data.username, data.password, (isLoggedIn:boolean, _errors:IUserErrors[] | null)=>{
        //     // if (isLoggedIn){
        //     //     navigate('/boards',{replace:true});
        //     // }else{
        //     //     setBusy(false);
        //     //     if (_errors){
        //     //         _errors.forEach(({ name, type, message }) => setError(name, {type, message}));
        //     //     }else{
        //     //         console.error('Неизвестная ошибка.');
        //     //     }
        //     // }
        // });
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
                <FormProvider {... methods}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <SignInComponent/>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={showBusy}
                        >
                        {showBusy && <CircularProgress size={24} />}
                        {!showBusy && "Войти"}
                        </Button>
                    </Box>
                </FormProvider>
            </Box>
        </Container>
    </ThemeProvider>
    }
    {!auth.userCount() && <Navigate to='/signup'/>}
    </>
    );
}