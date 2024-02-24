//import TextField from '@mui/material/TextField';
import { useFormContext } from "react-hook-form"
import { TextField, Box, Link } from '@mui/material';
import IUser from '../../interfaces/IUserRedux';
import { hideSignIn, showSignUp } from '../../store/slice/auth/authSlice'
import useAppDispatch from "../../hooks/AppDispatch";
export default function SignInComponent(){
    const dispatch = useAppDispatch();
    const {
        register,
        formState: { errors },
    } = useFormContext<IUser>();

    return (
            <Box
            sx={{
                marginTop: .5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                    <TextField
                    margin="normal"
                    required={true}
                    fullWidth
                    id="username"
                    label="Имя пользователя"
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
                    label="Пароль"
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
                <Box textAlign="right">Нет акаунта <Link href="#" onClick={()=>{
                    dispatch(hideSignIn())
                    dispatch(showSignUp())
                }} variant="body2">зарегистрируйтесь.</Link></Box>
            </Box>
    );
}