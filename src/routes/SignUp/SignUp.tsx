import * as React from 'react';
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
import { useHref } from 'react-router-dom';
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface IUserForm {
    username?:string,
    password?:string,
    firstName?:string,
    lastName?:string
    email?:string
}
type StrObj = {[index:string]:string|undefined};
const labels:StrObj = {
    username:'имя пользователя',
    password:'пароль',
    firstName:'фамилия',
    lastName:'имя',
    email:'email'
};
export default function SignUp() {
    const [errors, setErrors] = useState  <IUserForm>({});
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const errorMessages:StrObj = {};
        const requaredMsg = (fieldName:string)=>`Поле "${labels[fieldName]}" должно быть заполнено!`;
        data.forEach((it, ind:string)=>{
            const val=it.toString();
            if (!val){
                errorMessages[ind] = requaredMsg(ind);
            }
        });
        setErrors(errorMessages);
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Фамилия"
                    autoFocus
                    error={typeof(errors.firstName)==='string'}
                    helperText={errors.firstName?errors.firstName:''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Имя"
                    name="lastName"
                    autoComplete="family-name"
                    error={typeof(errors.lastName)==='string'}
                    helperText={errors.lastName?errors.lastName:''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    label="Имя пользователя"
                    name="username"
                    autoComplete="username"
                    error={typeof(errors.username)==='string'}
                    helperText={errors.username?errors.username:''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={typeof(errors.email)==='string'}
                    helperText={errors.email?errors.email:''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={typeof(errors.password)==='string'}
                    helperText={errors.password?errors.password:''}
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Зарегистрироваться
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>Уже есть акаунт <Link href={useHref("/login")} variant="body2">войти</Link>?</Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}