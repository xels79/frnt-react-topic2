
import { Box, Checkbox, FormControlLabel, FormGroup, LinearProgress, Snackbar }  from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTDSGetAllQuery } from '../../store/slice/Todos/TodosQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setShowOnlyMyBoards } from '../../store/slice/auth/authSlice';
import { DataGrid, GridCallbackDetails, GridPaginationModel, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import createColumns from './BoardsColumns'
import AddTodo from '../../components/AddTodo/Addtodo'
import BoardFooter from './BoardFooter'
export default function Boards(){
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const {ownedbyuser, routepage} = useParams();
    const usDefault = useSelector((state:RootState)=>state.auth.user?.option?.showOnlyMyBoards===true)||!!ownedbyuser;
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const [showUserId, setShowUserId] = useState(usDefault?userId:0);
    const [page, setPage] = useState(routepage?+routepage:1);
    const [pageSize, setPageSize] = useState(3);
    const [showMessage, setShowMessage] = useState(true);
    const { data , error, isFetching } = useTDSGetAllQuery({userId:showUserId,page:page,pageSize:pageSize});
    const changeUserShowClick = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setShowOnlyMyBoards(e.target.checked));
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
            setPageSize(dt.pageSize);
        }
    };
    const paginationModel={
        page: page?(page-1):0, 
        pageSize: data?data.pagination.perPage:0,
    }
    const columns = createColumns();
    const onRowClick = (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{
        console.log(params, event,details);
    }
    // useEffect(()=>{
    //     if (showMessage){
    //         setShowMessage(false);
    //     }
    // },[showMessage])
    useEffect(()=>{
        console.log('ownedbyuser',!!ownedbyuser);
        console.log('userID',userId);
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
                <DataGrid
                    sx={{height:600}}
                    rows={data.todos}
                    columns={columns}
                    rowCount={data?data.pagination.totalCount:0}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    pageSizeOptions={[2,3,5,10]}
                    onPaginationModelChange={handlePageChange}
                    loading={isFetching}
                    onRowClick={onRowClick}
                    slots={{
                        loadingOverlay: LinearProgress,
                        footer:BoardFooter
                    }}

                    // checkboxSelection
                />
            </Box>
        </Box>
        }
        </>
    );
}