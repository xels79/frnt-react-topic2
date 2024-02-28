import {Button, Stack, TextField} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import {useTDSGetCreateNewMutation} from '../../store/slice/Todos/TodosQuery'
import { useEffect } from 'react';
import { RootState } from '../../store/Store';
import { useSelector } from 'react-redux';
import useAppDispatch from '../../hooks/AppDispatch';
import { addMessage } from '../../store/slice/messages/MessageSlice';
interface INewTodo{
    newtodoName:string
}
export default function AddTodo(){
    const [ TDSGetAll, result] = useTDSGetCreateNewMutation();
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<INewTodo>();
    const onSubmit: SubmitHandler<INewTodo> = (data) => {
        console.log(data);
        if (userId){
            TDSGetAll({name:data.newtodoName, user_id:userId});
        }
    }
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if (!result.isUninitialized && !result.isLoading){
            if (result.isSuccess && !result.isError){
                dispatch(addMessage({type:"success","message":"Успешно сохранено"}));
                reset();
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка сохранения"}));
            }
        }
        console.log('addtodo',result);
    },[result]);

    return <Stack alignItems="center" component="form" onSubmit={handleSubmit(onSubmit)} direction="row" spacing={2} margin="1rem 2rem">
    <TextField {...register("newtodoName",{
        required:{
            value:true,
            message:"Нужно заполнить"
        }

    })}
    error={typeof(errors.newtodoName)==='object'}
    helperText={typeof(errors.newtodoName)==='object'?errors.newtodoName.message:' '}
    label="Название новой задачи" size="small" variant="standard" sx={{flex:1}} />
    <Button type="submit" variant="outlined" color="success" size="small">Добавить</Button>
    </Stack>

}