
import { Box } from '@mui/material';
import ActionBoards from '../../components/ActionBoard/ActionBoards';


export default function Boards(){

    return (
        <Box component="div" sx={{pb:10.5}}>
            <ActionBoards boards={[
                {
                    header:'Задание №1',
                    data:'13 сент 2023г.',
                    actionList:[
                        {
                            name:'Действие 1',
                            descriptionsList:['Описание действия 1', 'Описание действия 1.1']
                        },
                        {
                            name:'Действие 2',
                            descriptionsList:['Описание действия 2']
                        }
                    ]
                },
                {
                    header:'Задание №2',
                    data:'14 сент 2023г.',
                    actionList:[
                        {
                            name:'Действие 1',
                            descriptionsList:['Описание действия 1', 'Описание действия 1.1']
                        },
                        {
                            name:'Действие 2',
                            descriptionsList:['Описание действия 2']
                        },
                        {
                            name:'Действие 3',
                            descriptionsList:['Описание действия 3','Описание действия 3.1','Описание действия 3.2']
                        }
                    ]
                }
            ]}/>
        </Box>
    );
}