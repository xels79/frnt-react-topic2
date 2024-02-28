//import TextField from '@mui/material/TextField';
import {  useFormContext } from "react-hook-form"
import { TextField, Box, Grid, Link } from '@mui/material';
import {ISignUpUser} from '../../interfaces/IUserRedux';
import { showSignIn, hideSignUp } from '../../store/slice/auth/authSlice'
import useAppDispatch from "../../hooks/AppDispatch";

export default function SignUpComponent(){
    const dispatch = useAppDispatch();
    const {
        register,
        formState: { errors },
    } = useFormContext<ISignUpUser>();

    return (
            <Box
            sx={{
                marginTop: .5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            {/* <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}> */}
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
                    id="signup_username"
                    label="Имя пользователя"
                    {...register("username",{
                        required:{
                            value:true,
                            message:'Поле "Имя пользователя" должнобыть заполнено'
                        },
                        pattern:{
                            value:/^[^\&\s^\=^\+^\\\/\|\.\'\"]+$/,
                            message:'Не допустимые символы.'
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
                    id="newpassword"
                    autoComplete="new-password"
                    {...register("newpassword",{
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
                <Grid container justifyContent="flex-end">
                    <Grid item sx={{mt:2}}>Уже есть акаунт <Link href="#" onClick={()=>{
                        dispatch(hideSignUp());
                        dispatch(showSignIn());
                    }}>войти</Link>?</Grid>
                </Grid>
            </Box>
    );
}