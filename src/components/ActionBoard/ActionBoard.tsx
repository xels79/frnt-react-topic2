import { Card, CardContent, CardHeader } from "@mui/material"
import BoardContent from "./BoardContent"
import { ITodoAction } from "../../interfaces/ITodo"
export interface IActionBoard{
    header:string,
    data:string,
    actionList:ITodoAction[]
}
export default function ActionBoard({header, data, actionList}:IActionBoard){
    return (
    <>
        <Card variant="outlined" sx={{ boxShadow: 4, maxWidth: 460, margin:'0 auto 1rem auto'}}>
        <CardHeader title={header} subheader={data} sx={{pb:.5}}/>
            <CardContent sx={{textAlign:'left',pb:1}}>
                {actionList.map((action,index)=><BoardContent key={`AB-${header}-${index}`} todoAction={action} />)}
            </CardContent>
        </Card>
    </>)
}