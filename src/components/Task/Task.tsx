import { useEffect, useState } from "react"
import { ITodoAction } from "../../interfaces/ITodo"
import { useTDSDeleteActionMutation, useTDSGetTodoActionsQuery, useTDSGetTodoQuery, useTDSUpdateActionNameMutation, useTDSUpdateActionStateMutation } from "../../store/slice/Todos/TodosQuery";
import { DataGrid, GridActionsCellItem, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModes, GridRowModesModel, GridRowParams } from "@mui/x-data-grid";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import { Box, Checkbox, FormControlLabel, FormGroup, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import useAppDispatch from "../../hooks/AppDispatch";
import { addMessage } from "../../store/slice/messages/MessageSlice";
import AddTodoAction from "../AddTodoAction/AddTodoAction"
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AlertDialog from "../Dialogs/AlertDialog";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { addBreadCrumbs } from "../../store/slice/breadcrumbs/BreadCrumbsSlice";
import { useParams } from "react-router-dom";

declare module '@mui/x-data-grid' {
    interface FooterPropsOverrides {
        todoId: number;
    }
}
export default function Task({
    taskNum,
}:{
    taskNum:number,
}){
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState([0,1,2]);
    const { data, isFetching } = useTDSGetTodoQuery(taskNum);
    const { data:todoActions, isFetching:isFetchingTodoAction} = useTDSGetTodoActionsQuery({todo__id:taskNum, status:filter});
    //const todoActions:ITodoAction[] = _todoActions? _todoActions:[];
    const [updateState, updateStateResult] = useTDSUpdateActionStateMutation();
    const [deleteAction, deleteActionResult] = useTDSDeleteActionMutation();
    const [updateName, updateNameResult] = useTDSUpdateActionNameMutation();
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const { ownedbyuser, routepage} = useParams();
    const toBoards = `/boards${ownedbyuser?'/ownedbycurrentuser':''}`+(routepage?`/page/${routepage}`:'');
    const handleStateChange = (row:ITodoAction, status:number)=>{
        console.log(row);
        const stateText = status>1?"готов":(status>0?"в работе":"ждет")
        dispatch(addMessage({type:"warning","message":`Изменяем состояние для "${row.name}" на "${stateText}".`,durration:2000}));
        updateState({id:+row.id,status:status});
    }
    const [idToDelete, setIdToDelete] = useState(0);

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        console.log('handleRowModesModelChange', newRowModesModel)
        setRowModesModel(newRowModesModel);
    };
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
    
    const proceedDelete = ()=>{
        dispatch(addMessage({type:"warning","message":`Удаляем действие`,durration:2000}));
        deleteAction(idToDelete);
        setIdToDelete(0);
    }
    const handleDeleteClick = (id: GridRowId ) => () => {
        console.warn('handleDeleteClick',id);
        if  (todoActions){
            const row = todoActions.find((row) => row.id === id as number);
            if (row){
                setIdToDelete(+id as number);
            }else{
                // console.log(todos, row,id);
            }
        }
    };
    
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    }
    const processRowUpdate = (newRow: ITodoAction) => {
        const updatedRow = { ...newRow, isNew: false };
        console.log('newRow', newRow);
        //setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        dispatch(addMessage({type:"warning","message":"Сохраняю...",durration:2000}));
        updateName({id:+updatedRow.id, name:updatedRow.name});
        return updatedRow;
    };
    const onRowEditStart = (params:GridRowParams)=>{
        console.log("onRowEditStart", params);
    }

    const columns = [
        { field: 'name', headerName:"Действие", flex: 1, minWidth: 150, editable: true},
        { field: 'todoActions0', headerName: 'Готов', width: 80, minWidth: 50,
            renderCell: (params: GridRenderCellParams<ITodoAction>)=>{
                return <IconButton 
                    onClick={()=>{handleStateChange(params.row,2)}}
                    color={+params.row.status===2?"success":"default"}><CheckCircleIcon/>
                </IconButton>
            }
        },
        { field: 'todoActions1', headerName: 'В работе', width: 80, minWidth: 50,
            renderCell: (params: GridRenderCellParams<ITodoAction>)=>{
                return <IconButton
                    color={+params.row.status===1?"warning":"default"}
                    onClick={()=>{handleStateChange(params.row,1)}}
                ><WorkHistoryIcon /></IconButton>
            }
        },
        { field: 'todoActions2', headerName: 'Ждет', width: 80, minWidth: 50,
            renderCell: (params: GridRenderCellParams<ITodoAction>)=>{
                return <IconButton
                    color={!+params.row.status?"error":"default"}
                    onClick={()=>{handleStateChange(params.row,0)}}
                ><WorkOffIcon /></IconButton>
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Управление',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }:{id:number}) => {
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
    ];
    useEffect(()=>{
        dispatch(addBreadCrumbs([
            {label:'Доски',link:toBoards},
            {label:data?`Задание - "${data.name}"`:'Задания',link:null}
        ]));
    }, [ownedbyuser, routepage, data]);
    useEffect(()=>{
        if (!updateNameResult.isUninitialized && !updateNameResult.isLoading){
            if (updateNameResult.isSuccess && !updateNameResult.isError){
                dispatch(addMessage({type:"success","message":"Успешно обнавлено"}));
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка обнавления"}));
            }
        }
        // console.log('updateNameResult',updateNameResult);
    },[updateNameResult]);
    useEffect(()=>{
        if (!updateStateResult.isUninitialized && !updateStateResult.isLoading){
            if (updateStateResult.isSuccess && !updateStateResult.isError){
                dispatch(addMessage({type:"success","message":"Успешно обнавлено"}));
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка обнавления"}));
            }
        }
        // console.log('updateStateResult',updateStateResult);
    },[updateStateResult]);
    useEffect(()=>{
        if (!deleteActionResult.isUninitialized && !deleteActionResult.isLoading){
            if (deleteActionResult.isSuccess && !deleteActionResult.isError){
                dispatch(addMessage({type:"success","message":"Успешно удалено"}));
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка удаления"}));
            }
        }
        // console.log('deleteActionResult',deleteActionResult);
    },[deleteActionResult]);
    const changeFilterClick = (status:number)=>{
        if (filter.find(el=>el===status)===status){
            setFilter(filter.filter(el=>el!==status));
        }else{
            setFilter([...filter, status]);
        }
    }
    function toolBar(){
        return <Box p={1}>
            <Typography variant="h5" textAlign="left">Показать:</Typography>
            <Toolbar variant="dense">
                <FormGroup row={true}>
                    <FormControlLabel onChange={()=>{changeFilterClick(2)}} control={<Checkbox defaultChecked={filter.find(el=>el===2)===2} />} label="Готовые" />
                    <FormControlLabel onChange={()=>{changeFilterClick(1)}} control={<Checkbox defaultChecked={filter.find(el=>el===1)===1}/>} label="В работе" />
                    <FormControlLabel onChange={()=>{changeFilterClick(0)}} control={<Checkbox defaultChecked={filter.find(el=>el===0)===0}/>} label="Ожидающие" />
                </FormGroup>
            </Toolbar>
        </Box>
    }
    return <>
        <DataGrid
            sx={{mt:2}}
            columns={columns}
            rows={todoActions?todoActions:[]}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            onRowEditStart={onRowEditStart}
            processRowUpdate={processRowUpdate}    
            loading={isFetching || isFetchingTodoAction}
            slots={{
                loadingOverlay: LinearProgress,
                footer: AddTodoAction,
                toolbar:toolBar
            }}
            slotProps={{
                footer:{todoId:taskNum}
            }}
        />
        <AlertDialog
            header="Внимание"
            open={!!idToDelete}
            message="Удалить действие"
            onClose={()=>{setIdToDelete(0)}}
            okClick={()=>{proceedDelete()}}
        />
    </>
}