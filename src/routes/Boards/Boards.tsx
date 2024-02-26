
import { Box } from '@mui/material';
import ActionBoards from '../../components/ActionBoard/ActionBoards';
import { useEffect } from 'react';
import useAppDispatch from '../../hooks/AppDispatch';
import { TodosGet } from '../../store/slice/Todos/TodosGet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { clearNeedUpdate } from '../../store/slice/Todos/TodosSlice';

export default function Boards(){
    const dispatch = useAppDispatch();
    const {pending, todos, needUpdate} = useSelector((state:RootState)=>state.TodoSlice);
    const todoCount = todos?todos.length:0;
    const page = 1;
    useEffect(()=>{
        if (!pending){
            dispatch(TodosGet());
            dispatch(clearNeedUpdate());
        }
    }, [needUpdate]);
    return (
        <Box component="div" sx={{pb:10.5}}>
            <ActionBoards boards={todos}/>
        </Box>
    );
}