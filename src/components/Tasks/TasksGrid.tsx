import { DataGrid, GridEventListener, GridRowEditStopReasons, GridRowModesModel, GridRowParams } from "@mui/x-data-grid"
import { ITodo } from "../../interfaces/ITodo"
import { useContext, useEffect, useState } from "react";
import BoardFooter from './TaskFooter'
import { LinearProgress } from "@mui/material";
import {BoardContext} from './Tasks'
import { useTDSDeleteMutation, useTDSUpdateMutation } from "../../store/slice/Todos/TodosQuery";
import useAppDispatch from "../../hooks/AppDispatch";
import { addMessage } from "../../store/slice/messages/MessageSlice";
import AlertDialog from "../Dialogs/AlertDialog";
import { TasksColumns } from './TasksColumns'; 
export default function TasksGrid({isFetching, page, todos,pagination,ownedbyuser}:{
    page:number,
    todos:ITodo[],
    isFetching:boolean,
    ownedbyuser:string|undefined,
    pagination: {
        currentPage: number;
        pageCount: number;
        perPage: number;
        totalCount: number;
    }
}){
    const {handlePageChange, onRowClick} = useContext(BoardContext);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [rowUpdate, rowUpdateResult] = useTDSUpdateMutation();
    const [rowRemove, rowRemoveResult] = useTDSDeleteMutation();
    const dispatch = useAppDispatch();
    const [warningMessage, setWarningMessage] = useState('');
    const [toRemoveId, setToRemoveId] = useState(0);
    
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        console.log('handleRowModesModelChange', newRowModesModel)
        setRowModesModel(newRowModesModel);
    };
    const processRowUpdate = (newRow: ITodo) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log('newRow', newRow);
        dispatch(addMessage({type:"warning","message":"Сохраняю...",durration:2000}));
        rowUpdate(newRow);
        return updatedRow;
    };
    const onRowEditStart = (params:GridRowParams)=>{
        console.log("onRowEditStart", params);
    }
    const paginationModel={
        page:  page?(page-1):0,
        pageSize: pagination.perPage,
    }

    useEffect(()=>{
        if (!rowUpdateResult.isUninitialized && !rowUpdateResult.isLoading){
            if (rowUpdateResult.isSuccess && !rowUpdateResult.isError){
                dispatch(addMessage({type:"success","message":"Успешно сохранено"}));
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка сохранения"}));
            }
        }
        // console.log('rowUpdateResult',rowUpdateResult);
    },[rowUpdateResult]);
    useEffect(()=>{
        if (!rowRemoveResult.isUninitialized && !rowRemoveResult.isLoading){
            if (rowRemoveResult.isSuccess && !rowRemoveResult.isError){
                dispatch(addMessage({type:"success","message":"Успешно удалено"}));
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка удаления"}));
            }
        }
        // console.log('rowRemoveResult',rowRemoveResult);
    },[rowRemoveResult]);

    return <><DataGrid
            sx={{height:600}}
            rows={todos}
            columns={TasksColumns({
                setRowModesModel:setRowModesModel,
                todos:todos,
                rowModesModel:rowModesModel,
                setWarningMessage:setWarningMessage,
                setToRemoveId:setToRemoveId,
                ownedbyuser:ownedbyuser,
                page:page
            })}
            rowCount={pagination.totalCount}
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
            onRowEditStart={onRowEditStart}
            processRowUpdate={processRowUpdate}
            slots={{
                loadingOverlay: LinearProgress,
                footer:BoardFooter
            }}

        // checkboxSelection
        />
        <AlertDialog
            open={!!toRemoveId}
            message={warningMessage}
            onClose={()=>{setToRemoveId(0)}}
            okClick={()=>{
                console.log('Try to delete', toRemoveId);
                dispatch(addMessage({type:"warning","message":"Удаляю...",durration:2000}));
                rowRemove(toRemoveId);
                setToRemoveId(0)
            }}
        /></>
}