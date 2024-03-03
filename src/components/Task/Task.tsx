import { useEffect } from "react"
import { ITodoAction } from "../../interfaces/ITodo"
import { useTDSGetTodoQuery, useTDSUpdateActionStateMutation } from "../../store/slice/Todos/TodosQuery";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import { Icon, IconButton, LinearProgress, Typography } from "@mui/material";
import useAppDispatch from "../../hooks/AppDispatch";
import { addMessage } from "../../store/slice/messages/MessageSlice";
import AddTodoAction from "../AddTodoAction/AddTodoAction"
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
    const { data, isFetching } = useTDSGetTodoQuery(taskNum);
    const todoActions:ITodoAction[] = data?data.todoActions as ITodoAction[]:[];
    const [updateState, updateStateResult] = useTDSUpdateActionStateMutation();
    const handleStateChange = (row:ITodoAction, status:number)=>{
        console.log(row);
        const stateText = status>1?"готов":(status>0?"в работе":"ждет")
        dispatch(addMessage({type:"warning","message":`Изменяем состояние для "${row.name}" на "${stateText}".`,durration:2000}));
        updateState({id:+row.id,status:status});
    }
    const columns = [
        { field: 'name', headerName:"Действие", flex: 1, minWidth: 150},
        { field: 'todoActions0', headerName: 'Готов', width: 80, minWidth: 50,
            renderCell: (params: GridRenderCellParams<ITodoAction>)=>{
                console.log(params.row.status);
                return <IconButton 
                    onClick={()=>{handleStateChange(params.row,2)}}
                    color={+params.row.status===2?"success":"default"}><CheckCircleIcon/>
                </IconButton>
            }
        },
        { field: 'todoActions1', headerName: 'В работе', width: 80, minWidth: 50,
            renderCell: (params: GridRenderCellParams<ITodoAction>)=>{
                console.log(params.row.status);
                return <IconButton
                    color={+params.row.status===1?"warning":"default"}
                    onClick={()=>{handleStateChange(params.row,1)}}
                ><WorkHistoryIcon /></IconButton>
            }
        },
        { field: 'todoActions2', headerName: 'Ждет', width: 80, minWidth: 50,
            renderCell: (params: GridRenderCellParams<ITodoAction>)=>{
                console.log(params.row.status);
                return <IconButton
                    color={!+params.row.status?"error":"default"}
                    onClick={()=>{handleStateChange(params.row,0)}}
                ><WorkOffIcon /></IconButton>
            }
        }
    ];
    useEffect(()=>{
        console.log(data);
    },[data]);
    useEffect(()=>{
        if (!updateStateResult.isUninitialized && !updateStateResult.isLoading){
            if (updateStateResult.isSuccess && !updateStateResult.isError){
                dispatch(addMessage({type:"success","message":"Успешно обнавлено"}));
            }else{
                dispatch(addMessage({type:"error","message":"Ошибка обнавления"}));
            }
        }
        console.log('updateStateResult',updateStateResult);
    },[updateStateResult]);
    return <>
        <p>Задание "{data?.name}"</p>
        <DataGrid
            columns={columns}
            rows={todoActions}
            // hideFooter={true}
            
            loading={isFetching}
            slots={{
                loadingOverlay: LinearProgress,
                footer: AddTodoAction
            }}
            slotProps={{
                footer:{todoId:taskNum}
            }}
        />
    </>
}