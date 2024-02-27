
import { Box, Checkbox, FormControlLabel, FormGroup, Pagination, Stack, Typography } from '@mui/material';
import ActionBoards from '../../components/ActionBoard/ActionBoards';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTDSGetAllQuery } from '../../store/slice/Todos/TodosQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setShowOnlyMyBoards } from '../../store/slice/auth/authSlice';
import Declension from '../../components/Declension/Declension'

export default function Boards(){
    const dispatch = useDispatch();
    const usDefault = useSelector((state:RootState)=>state.auth.user?.option?.showOnlyMyBoards===true);
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const [showUserId, setShowUserId] = useState(usDefault?userId:0);
    const [page, setPage] = useState(1);
    const { data , error, isLoading:pending } = useTDSGetAllQuery({userId:showUserId,page:page});
    const changeUserShowClick = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setShowOnlyMyBoards(e.target.checked));
        if (e.target.checked){
            setShowUserId(userId);
        }else{
            setShowUserId(0);
        }
    }
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    
    useEffect(()=>{
        console.log(data,error,pending);
        if (data && page>data.pagination.pageCount){
            setPage(+data.pagination.pageCount);
        }
    },[data,error,pending]);
    return (
        <>
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={usDefault} onChange={changeUserShowClick}/>} label="Только текущего пользователя" />
        </FormGroup>
        {data?.todos && <Box paddingBottom={2}>
            <Box component="div" sx={{pb:1.5}}>
                <ActionBoards boards={data.todos}/>
            </Box>
            {data?.pagination.pageCount>1 && <Stack spacing={2} alignItems="center">
                <Typography>Страничка: №{page}, показано {data?.todos.length}&nbsp;
                <Declension num={data && data.todos?data.todos.length:0} declension={["запись","записи","записей"]}/> из {data?.pagination.totalCount}&nbsp;
                <Declension num={data?data.pagination.totalCount:0} declension={["записи","записей","записей"]}/>
                </Typography>
                <Pagination count={data?data.pagination.pageCount:0} page={page} onChange={handlePageChange} />
            </Stack>}
        </Box>
        }
        </>
    );
}