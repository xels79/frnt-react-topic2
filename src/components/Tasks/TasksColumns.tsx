import { GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId, GridRowModes, GridRowModesModel, GridValueFormatterParams } from "@mui/x-data-grid";
import { ITodo, ITodoAction, IUserInfo } from "../../interfaces/ITodo";
import { Badge, Icon, Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
interface ITaskContext{
    setRowModesModel: (value: React.SetStateAction<GridRowModesModel>) => void,
    todos: ITodo[],
    rowModesModel: GridRowModesModel,
    setWarningMessage: (value: React.SetStateAction<string>) => void,
    setToRemoveId: (value: React.SetStateAction<number>) => void,
    ownedbyuser: string | undefined,
    page:number
}

export const TasksColumns=({
    setRowModesModel,
    todos,
    rowModesModel,
    setWarningMessage,
    setToRemoveId,
    ownedbyuser,
    page
}:ITaskContext):GridColDef[] =>{
    const navigation = useNavigate();
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
        }
    };
    
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    }

    return  [
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
                let title
                if (!itCount){
                    title = "Нет действий - перейти на страничку с действиями";
                }else{
                    title = `Выполнено ${doneCount} из ${itCount} действий `;
                    title += "перейти на страничку с действиями";
                }
                return <Tooltip title={title}><Badge 
                        color={!doneCount&&!itCount?"secondary":(doneCount<(itCount/2)?"error":"warning")}
                        badgeContent={itCount-doneCount}
                        onClick={()=>{
                            console.log("Open action page",params.row.id);
                            navigation(`/boards${ownedbyuser?'/ownedbycurrentuser':''}${page?`/page/${page}`:''}/board/${params.row.id}`);
                        }}
                        sx={{cursor:"pointer"}}
                    ><EngineeringIcon color={!itCount?"error":"primary"}/></Badge></Tooltip>
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
]}