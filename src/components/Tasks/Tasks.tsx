
import { Box, Checkbox, FormControlLabel, FormGroup, Toolbar, Typography }  from '@mui/material';
import { ChangeEvent, createContext, useEffect, useState } from 'react';
import { useTDSGetAllQuery } from '../../store/slice/Todos/TodosQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setShowEmptyBoards, setShowInWorkBoards, setShowOnlyMyBoards, setShowReadyBoards } from '../../store/slice/auth/authSlice';
import { GridCallbackDetails, GridPaginationModel, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import TasksGrid from './TasksGrid';
interface IBContext{
    onRowClick : (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>void
    handlePageChange: (dt: GridPaginationModel) => void
}
const BContextInitVal:IBContext={
    onRowClick : (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{console.warn("onRowClick: notset",params, event, details)},
    handlePageChange: (dt: GridPaginationModel) => {console.warn("handlePageChange: notset", dt)}
}
export const BoardContext = createContext(BContextInitVal);
export default function Tasks(){
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const {ownedbyuser, routepage} = useParams();
    const showOnlyMyBoards = useSelector((state:RootState)=>state.auth.user?.option?.showOnlyMyBoards===true);
    const boardsPageItemCount = useSelector((state:RootState)=>state.auth.user?.option?.boardsPageItemCount);
    const pageSize = boardsPageItemCount?boardsPageItemCount:3;
    const usDefault = showOnlyMyBoards || !!ownedbyuser;
    const _showReady = useSelector((state:RootState)=>state.auth.user?.option?.showReady);
    const _showEmpty = useSelector((state:RootState)=>state.auth.user?.option?.showEmpty);
    const _showInWork = useSelector((state:RootState)=>state.auth.user?.option?.showInWorks);
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const [showUserId, setShowUserId] = useState(usDefault?userId:0);
    const [page, setPage] = useState(routepage?+routepage:1);
    const { data, isFetching } = useTDSGetAllQuery({
        userId:showUserId,
        page:page,
        pageSize:pageSize,
        hideEmpty:!_showEmpty,
        hideReady:!_showReady,
        hideInWorks:!_showInWork
    });//error - За ремил
    const onRowClick = (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{
        console.log(params, event,details);
    }
    const changeShowInWorkClick= (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setShowInWorkBoards(e.target.checked));
    }
    const changeShowReadyClick = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setShowReadyBoards(e.target.checked));
    }
    const changeShowEmptyClick = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setShowEmptyBoards(e.target.checked));
    }
    const changeUserShowClick = (e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.checked){
                navigation('/boards/ownedbycurrentuser'+(routepage?`/page/${routepage}`:''));
                setShowUserId(userId);
        }else{
            navigation('/boards'+(routepage?`/page/${routepage}`:''))
            setShowUserId(0);
        }
    }
    const handlePageChange = (dt:GridPaginationModel) => {
        if (dt.page+1!==page){
            navigation(`/boards${ownedbyuser?'/ownedbycurrentuser':''}/page/${dt.page+1}`);
        }
        if (dt.pageSize!==pageSize){
            dispatch(setShowOnlyMyBoards({
                showOnlyMyBoards:showOnlyMyBoards,
                boardsPageItemCount:dt.pageSize,
                showEmpty:!!_showEmpty,
                showReady:!!_showReady,
                showInWorks:!!_showInWork
            }));
        }
    };

    useEffect(()=>{
        // console.log('ownedbyuser',!!ownedbyuser);
        // console.log('userID',userId);
        // console.log('routepage',routepage);
        if (typeof(routepage)==='string' && page!==+routepage){
            setPage(+routepage);
        }
        if (data && page>data.pagination.pageCount){
            navigation(`/boards${ownedbyuser?'/ownedbycurrentuser':''}/page/${data.pagination.pageCount}`,{replace:true});
        }
        if (usDefault && !ownedbyuser){
            navigation('ownedbycurrentuser',{replace:true});
        }
    },[routepage,usDefault, data?.pagination.pageCount])
    return (
        <>
        <Box p={1}>
            <Typography variant="h5" textAlign="left">Показать:</Typography>
            <Toolbar variant="dense">
                <FormGroup row={true}>
                    <FormControlLabel control={<Checkbox checked={usDefault} onChange={changeUserShowClick}/>} label="Только текущего пользователя" />
                    <FormControlLabel control={<Checkbox checked={!!_showEmpty} onChange={changeShowEmptyClick}/>} label="Пустые" />
                    <FormControlLabel control={<Checkbox checked={!!_showReady} onChange={changeShowReadyClick}/>} label="Законченые" />
                    <FormControlLabel control={<Checkbox checked={!!_showInWork} onChange={changeShowInWorkClick}/>} label="В работе" />
                </FormGroup>
            </Toolbar>
        </Box>
        {data?.todos && <Box paddingBottom={2}>
            <Box component="div" sx={{pb:1.5,width:'100%'}}>
                <BoardContext.Provider value={{
                    handlePageChange:(dt: GridPaginationModel)=>{handlePageChange(dt)},
                    onRowClick:(params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{onRowClick(params,event,details)}
                }}>
                    <TasksGrid
                        todos={data?data.todos:[]}
                        pagination={data?data.pagination:{pageCount:0,perPage:0,currentPage:0,totalCount:0}}
                        isFetching={isFetching}
                        page={page}
                        ownedbyuser={ownedbyuser}
                    />
                </BoardContext.Provider>
            </Box>
        </Box>
        }
        </>
    );
}