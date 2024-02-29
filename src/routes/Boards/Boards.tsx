
import { Box, Checkbox, FormControlLabel, FormGroup, LinearProgress }  from '@mui/material';
import { ChangeEvent, createContext, useEffect, useState } from 'react';
import { useTDSGetAllQuery } from '../../store/slice/Todos/TodosQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setShowOnlyMyBoards } from '../../store/slice/auth/authSlice';
import { DataGrid, GridCallbackDetails, GridEventListener, GridPaginationModel, GridRowEditStopReasons, GridRowModesModel, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import createColumns from './BoardsColumns'
import BoardFooter from './BoardFooter'
export const BoardContext = createContext({});
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
    const { data , error, isFetching } = useTDSGetAllQuery({userId:showUserId,page:page,pageSize:pageSize});
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
    const paginationModel={
        page: page?(page-1):0, 
        pageSize: data?data.pagination.perPage:0,
    }
    const columns = createColumns();
    const onRowClick = (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{
        console.log(params, event,details);
    }
    const [rows, setRows] = useState(data?.todos);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


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
                <BoardContext.Provider value={{
                    rows:rows,
                    rowModesModel:rowModesModel,
                    setRows:setRows,
                    setRowModesModel:setRowModesModel
                }}>
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
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                
                        slots={{
                            loadingOverlay: LinearProgress,
                            footer:BoardFooter
                        }}

                        // checkboxSelection
                    />
                </BoardContext.Provider>
            </Box>
        </Box>
        }
        </>
    );
}