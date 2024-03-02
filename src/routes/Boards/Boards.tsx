
import { Box, Checkbox, FormControlLabel, FormGroup }  from '@mui/material';
import { ChangeEvent, createContext, useEffect, useState } from 'react';
import { useTDSGetAllQuery } from '../../store/slice/Todos/TodosQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setShowOnlyMyBoards } from '../../store/slice/auth/authSlice';
import { GridCallbackDetails, GridPaginationModel, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import BoardsGrid from './BoardsGrid';
interface IBContext{
    onRowClick : (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>void
    handlePageChange: (dt: GridPaginationModel) => void
}
const BContextInitVal:IBContext={
    onRowClick : (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{console.warn("onRowClick: notset",params, event, details)},
    handlePageChange: (dt: GridPaginationModel) => {console.warn("handlePageChange: notset", dt)}
}
export const BoardContext = createContext(BContextInitVal);
export default function Boards(){
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const {ownedbyuser, routepage} = useParams();
    const showOnlyMyBoards = useSelector((state:RootState)=>state.auth.user?.option?.showOnlyMyBoards===true);
    const boardsPageItemCount = useSelector((state:RootState)=>state.auth.user?.option?.boardsPageItemCount)
    const pageSize = boardsPageItemCount?boardsPageItemCount:3;
    const usDefault = showOnlyMyBoards || !!ownedbyuser;
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const [showUserId, setShowUserId] = useState(usDefault?userId:0);
    const [page, setPage] = useState(routepage?+routepage:1);
    const { data, isFetching } = useTDSGetAllQuery({userId:showUserId,page:page,pageSize:pageSize});//error - За ремил
    const onRowClick = (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{
        console.log(params, event,details);
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
            dispatch(setShowOnlyMyBoards({showOnlyMyBoards:showOnlyMyBoards,boardsPageItemCount:dt.pageSize}));
        }
    };

    useEffect(()=>{
        // console.log('ownedbyuser',!!ownedbyuser);
        // console.log('userID',userId);
        console.log('routepage',routepage);
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
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={usDefault} onChange={changeUserShowClick}/>} label="Только текущего пользователя" />
        </FormGroup>
        {data?.todos && <Box paddingBottom={2}>
            <Box component="div" sx={{pb:1.5,width:'100%'}}>
                <BoardContext.Provider value={{
                    handlePageChange:(dt: GridPaginationModel)=>{handlePageChange(dt)},
                    onRowClick:(params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{onRowClick(params,event,details)}
                }}>
                    <BoardsGrid
                        todos={data?data.todos:[]}
                        pagination={data?data.pagination:{pageCount:0,perPage:0,currentPage:0,totalCount:0}}
                        isFetching={isFetching}
                        page={page}
                    />
                </BoardContext.Provider>
            </Box>
        </Box>
        }
        </>
    );
}