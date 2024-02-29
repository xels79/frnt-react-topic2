import { GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId, GridRowModes, GridRowModesModel, GridValueFormatterParams } from "@mui/x-data-grid";
import { ITodo, ITodoAction, IUserInfo } from "../../interfaces/ITodo";
import { Badge, Icon } from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MouseEventHandler, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import BoardContext from './Boards'

const createColumns = ():GridColDef[] => {
    //const {rowModesModel, setRowModesModel} = useContext(BoardContext);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const handleEditClick = (id: GridRowId) => () => {
        console.warn('handleEditClick',id);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id: GridRowId) => () => {
        console.warn('handleSaveClick',id);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    
    const handleDeleteClick = (id: GridRowId) => () => {
        console.warn('handleDeleteClick',id);
        //setRows(rows.filter((row) => row.id !== id));
    };
    
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    }
    
    // const editedRow = rows.find((row) => row.id === id);
    //     if (editedRow!.isNew) {
    //       setRows(rows.filter((row) => row.id !== id));
    //     }
    //   };
    
    return [
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
export default createColumns;