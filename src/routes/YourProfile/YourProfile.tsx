import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { IUserToServer, IUserUpdate } from '../../interfaces/IUserRedux';
import { Alert, Box, Button, ButtonGroup, Collapse, Stack, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { RootState } from '../../store/Store';
import { UserGetThunk } from '../../store/slice/UserREST/UserGetThunk';
import { UserSaveThunk } from '../../store/slice/UserREST/UserSaveThunk';
import { useSelector } from 'react-redux';
import style from './YourProfile.module.scss'
import useAppDispatch from '../../hooks/AppDispatch';
import { clearMessage } from '../../store/slice/UserREST/UserRESTSlice';
export default function YourProfile(){
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const {user, pending, errors:_errors, message} = useSelector((state:RootState)=>state.UserRest);
    const methods = useForm<IUserUpdate>({values:user?user:undefined});
    const [showTimer, setShowTimer] = useState(false);
    const dispatch = useAppDispatch();
    const oldUserId = useRef(0);
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = methods;
    const onSubmit:SubmitHandler<IUserUpdate> = (data)=>{
        const serverData:IUserToServer ={
            id:userId, user:data
        }
        console.log(data);
        dispatch(UserSaveThunk(serverData));
    }
    useEffect(()=>{
        if (_errors){
            console.log('errors',_errors);
            _errors.forEach(({ name, type, message }) => setError(name, {type, message}));
        }
        if ((!pending && userId && userId!=oldUserId.current)){
            dispatch(UserGetThunk(userId));
        }
        if (!pending && user && userId!=oldUserId.current){
            //trigger();
            oldUserId.current = userId;
        }
        if (message && !showTimer){
            setShowTimer(true);
        }
        },[_errors, user, userId, message]);
    return <Box sx={{position:'relative'}}>
        {user && 
        <Box component='form' sx={{marginTop: .5}} onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextField
                margin="normal"
                required={true}
                
                fullWidth
                id="username"
                label="Имя пользователя"
                autoComplete="username"
                // defaultValue={user?.username}
                autoFocus

                {...register("username",{
                    required:{
                        value:true,
                        message:'Поле "Имя пользователя" должнобыть заполнено'
                    },
                    pattern:{
                        value:/^[^\&\s^\=^\+^\\\/\|\.\"\']+$/,
                        message:'Не допустимые символы.'
                    }
                })}
                error={typeof(errors.username)==='object'}
                helperText={typeof(errors.username)==='object'?errors.username.message:''}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Имя"
                // defaultValue={user?.firstName}
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
                <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                // defaultValue={user?.lastName}
                {...register("lastName",{
                    required:{
                        value:true,
                        message:'Поле "Фамилия" должнобыть заполнено'
                    }
                })}
                error={typeof(errors.lastName)==='object'}
                helperText={typeof(errors.lastName)==='object'?errors.lastName.message:''}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                // defaultValue={user?.email}
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
            <TextField
                margin="normal"
                fullWidth
                label="Новый пароль"
                type="password"
                id="newpassword"
                autoComplete="off"
                {...register("newpassword",{
                    minLength:{
                        value:8,
                        message:'Поле "Пароль" должнобыть минимум 8 знаков'
                    },
                })}
                error={typeof(errors.newpassword)==='object'}
                helperText={typeof(errors.newpassword)==='object'?errors.newpassword.message:''}
                />
                <TextField
                margin="normal"
                fullWidth
                label="Старый пароль"
                type="password"
                id="oldpassword"
                autoComplete="off"
                {...register("oldpassword")}
                error={typeof(errors.oldpassword)==='object'}
                helperText={typeof(errors.oldpassword)==='object'?errors.oldpassword.message:''}
                />
            </Stack>
            <Box sx={{pt:1}}>
                <ButtonGroup color="primary" size="small" >
                        <Button type="submit" variant="contained" >Сохранить</Button>
                </ButtonGroup>
            </Box>
            {message &&
                <Collapse onEntered={()=>{
                    setTimeout(() => {
                        setShowTimer(false);
                        console.log('Time out');
                    },1000);
                }} onExited={()=>{
                    console.log("collapse end")
                    dispatch(clearMessage());
                }} easing="inOut" timeout={{
                    appear: 500,
                    enter: 300,
                    exit: 500,
                }} in={showTimer}>
                <Alert sx={{mt:1}} icon={<CheckIcon fontSize="inherit" />} severity={message.type==="ok"?"success":"error"}>
                    {message.text}
                </Alert>
                </Collapse>
            }
        </Box>}
        {(!user || pending) && <Box className={style.bunner}><span className={style.loader}></span></Box>}
    </Box>
}

// function SubmitHandler<T>(data: any) {
//     throw new Error('Function not implemented.');
// }
