
import { Box, Checkbox, FormControlLabel, FormGroup, LinearProgress}  from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useTDSGetAllQuery } from '../../store/slice/Todos/TodosQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setShowOnlyMyBoards } from '../../store/slice/auth/authSlice';
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridRowParams, GridValueFormatterParams, MuiEvent } from '@mui/x-data-grid';

export default function Boards(){
    const dispatch = useDispatch();
    const usDefault = useSelector((state:RootState)=>state.auth.user?.option?.showOnlyMyBoards===true);
    const userId = useSelector((state:RootState)=>state.auth.user?state.auth.user.id:0);
    const [showUserId, setShowUserId] = useState(usDefault?userId:0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const { data , error, isFetching } = useTDSGetAllQuery({userId:showUserId,page:page,pageSize:pageSize});
    const changeUserShowClick = (e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setShowOnlyMyBoards(e.target.checked));
        if (e.target.checked){
            setShowUserId(userId);
        }else{
            setShowUserId(0);
        }
    }
    const handlePageChange = (dt:GridPaginationModel) => {
        if (dt.page+1!==page){
            setPage(dt.page+1);
        }
        if (dt.pageSize!==pageSize){
            setPageSize(dt.pageSize);
        }
    };
    const paginationModel={
        page: page?(page-1):0, 
        pageSize: data?data.pagination.perPage:0,
    }
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Название задачи', width: 230 },
        { field: 'created_at', headerName:'Добавлено',width:220, 
            valueFormatter: (params: GridValueFormatterParams<string>) => params.value?(new Date(params.value)).toLocaleString():params.value
        }
    ];
    const onRowClick = (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails)=>{
        console.log(params, event,details);
    }
    return (
        <>
        <FormGroup>
            <FormControlLabel control={<Checkbox checked={usDefault} onChange={changeUserShowClick}/>} label="Только текущего пользователя" />
        </FormGroup>
        {data?.todos && <Box paddingBottom={2}>
            <Box component="div" sx={{pb:1.5,height:400,width:'100%'}}>
                <DataGrid
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
                    }}

                    // checkboxSelection
                />
            </Box>
        </Box>
        }
        </>
    );
}