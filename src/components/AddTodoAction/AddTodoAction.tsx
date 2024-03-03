import {Button, Stack, TextField} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import {useTDSCreateActionMutation} from '../../store/slice/Todos/TodosQuery'
import { useEffect } from 'react';
import useAppDispatch from '../../hooks/AppDispatch';
import { addMessage } from '../../store/slice/messages/MessageSlice';
interface INewTodo{
    newtodoName:string
}
export default function AddTodoAction({todoId}:{
    todoId:number
}){
    const [ createAction, result] = useTDSCreateActionMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<INewTodo>();
    const onSubmit: SubmitHandler<INewTodo> = (data) => {
        console.log(data);
        if (todoId){
            dispatch(addMessage({type:"warning",message:`Добовляем "${data.newtodoName}"`}));
            createAction({name:data.newtodoName, todo_id:todoId});
        }else{
            dispatch(addMessage({type:"error","message":"Не получен todo id"}));
        }
    }
    const dispatch = useAppDispatch();
    useEffect(()=>{
        if (!result.isUninitialized && !result.isLoading){
            if (result.isSuccess && !result.isError){
                dispatch(addMessage({type:"success","message":"Успешно добавлено"}));
                reset();
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка сохранения"}));
            }
        }
        // console.log('addtodo',result);
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
            label="Название нового действия" size="small" variant="standard" sx={{flex:1}}
        />
        <Button type="submit" variant="outlined" color="success" size="small">Добавить</Button>
    </Stack>

}