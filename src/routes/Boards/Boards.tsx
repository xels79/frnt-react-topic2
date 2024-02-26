
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ActionBoards from '../../components/ActionBoard/ActionBoards';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTDSGetAllQuery } from '../../store/slice/Todos/TodosQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setShowOnlyMyBoards } from '../../store/slice/auth/authSlice';

export default function Boards(){
    const dispatch = useDispatch();
    const usDefault = useSelector((state:RootState)=>state.auth.user?.option?.showOnlyMyBoards===true);
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const [showUserId, setShowUserId] = useState(usDefault?userId:0);
    const { data:todos, error, isLoading:pending } = useTDSGetAllQuery(showUserId);
    const changeUserShowClick = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setShowOnlyMyBoards(e.target.checked));
        if (e.target.checked){
            setShowUserId(userId);
        }else{
            setShowUserId(0);
        }
    }
    useEffect(()=>{
        console.log('tst');
        console.log(todos,error,pending);
    },[todos,error,pending]);
    return (
        <>
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked={usDefault} onChange={changeUserShowClick}/>} label="Только текущего пользователя" />
        </FormGroup>
        {todos && 
        <Box component="div" sx={{pb:10.5}}>
            <ActionBoards boards={todos}/>
        </Box>
        }
        </>
    );
}