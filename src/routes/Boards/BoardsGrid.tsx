import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModes, GridRowModesModel, GridRowParams, GridValueFormatterParams } from "@mui/x-data-grid"
import { ITodo, ITodoAction, IUserInfo } from "../../interfaces/ITodo"
import { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge/Badge";
import Icon from "@mui/material/Icon";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BoardFooter from './BoardFooter'
import { LinearProgress } from "@mui/material";
import {BoardContext} from './Boards'
import { useTDSDeleteMutation, useTDSUpdateMutation } from "../../store/slice/Todos/TodosQuery";
import useAppDispatch from "../../hooks/AppDispatch";
import { addMessage } from "../../store/slice/messages/MessageSlice";
import AlertDialog from "../../components/Dialogs/AlertDialog";
export default function BoardsGrid({isFetching, page, todos,pagination}:{
    page:number,
    todos:ITodo[],
    isFetching:boolean,
    pagination: {
        currentPage: number;
        pageCount: number;
        perPage: number;
        totalCount: number;
    }
}){
    const {handlePageChange, onRowClick} = useContext(BoardContext);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    //const [rows, setRows] = useState(todos);
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
    const handleEditClick = (id: GridRowId) => () => {
        console.warn('handleEditClick',id);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id: GridRowId) => () => {
        console.warn('handleSaveClick',id);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    
    const handleDeleteClick = (id: GridRowId ) => () => {
        console.warn('handleDeleteClick',id);
        const row = todos.find((row) => row.id === id as number);
        if (row){
            setWarningMessage(`Удалить задачу "${row.name}" пользователя "${row.user.shortFI}"`);
            setToRemoveId(+id as number);
        }else{
            // console.log(todos, row,id);
        }
        //setRows(rows.filter((row) => row.id !== id));
    };
    
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    }
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        console.log('handleRowModesModelChange', newRowModesModel)
        setRowModesModel(newRowModesModel);
    };
    const processRowUpdate = (newRow: ITodo) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log('newRow', newRow);
        //setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        dispatch(addMessage({type:"warning","message":"Сохраняю...",durration:2000}));
        rowUpdate(newRow);
        return updatedRow;
    };

    
    // const editedRow = rows.find((row) => row.id === id);
    //     if (editedRow!.isNew) {
    //       setRows(rows.filter((row) => row.id !== id));
    //     }
    //   };
    const onRowEditStart = (params:GridRowParams)=>{
        console.log("onRowEditStart", params);
    }

    const columns:GridColDef[] = [
        { field: 'user', headerName: 'Пользователь', width: 130,
            valueFormatter: (params: GridValueFormatterParams<IUserInfo>) => {
                return params.value.shortFI;
            }
        },
        { field: 'name', headerName: 'Название задачи', width: 230, editable: true },
        { field: 'created_at', headerName:'Добавлено',width:220, 
            valueFormatter: (params: GridValueFormatterParams<string>) => params.value?(new Date(params.value)).toLocaleString():params.value
        },
        { field: 'todoActions', headerName: 'Задачи', width: 80,
            renderCell: (params: GridRenderCellParams<ITodo>)=>{
                const itCount =  params.value?params.value.length:0;
                const doneCount = params.value?params.value.reduce((acc:number,item:ITodoAction)=>+item.status>1?acc+1:acc,0):0;
                if (itCount && itCount === doneCount){
                    return <Icon color="success"><CheckCircleIcon /></Icon>
                }else{
                return <Badge 
                    color={!doneCount&&!itCount?"secondary":"error"}
                    badgeContent={itCount}><EngineeringIcon/></Badge>
                }
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = id?rowModesModel[id]?.mode === GridRowModes.Edit:false;
                // console.log('getActions',id,a1,a2,a3);
                if (isInEditMode) {
    
                    return [
                        <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                        />,
                    ];
                }
    
                return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                />,
                ];
            },
        }
    ]
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
        console.log('rowUpdateResult',rowUpdateResult);
    },[rowUpdateResult]);
    useEffect(()=>{
        if (!rowRemoveResult.isUninitialized && !rowRemoveResult.isLoading){
            if (rowRemoveResult.isSuccess && !rowRemoveResult.isError){
                dispatch(addMessage({type:"success","message":"Успешно сохранено"}));
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка сохранения"}));
            }
        }
        console.log('rowRemoveResult',rowRemoveResult);
    },[rowRemoveResult]);

    return <><DataGrid
        sx={{height:600}}
        rows={todos}
        columns={columns}
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