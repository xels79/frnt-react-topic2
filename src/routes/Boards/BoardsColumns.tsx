import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from "@mui/x-data-grid";
import { ITodo, ITodoAction, IUserInfo } from "../../interfaces/ITodo";
import { Badge, Icon } from "@mui/material";
import EngineeringIcon from '@mui/icons-material/Engineering';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const createColumns= ():GridColDef[] => [
    { field: 'user', headerName: 'Пользователь', width: 130,
        valueFormatter: (params: GridValueFormatterParams<IUserInfo>) => {
            return params.value.shortFI;
        }
},
    { field: 'name', headerName: 'Название задачи', width: 230 },
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
    }
];
export default createColumns;