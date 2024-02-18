import { Card, CardContent, CardHeader } from "@mui/material"
import BoardContent from "./BoardContent"
import { IActionList } from "./BoardContent"
export interface IActionBoard{
    header:string,
    data:string,
    actionList:IActionList[]
}
export default function ActionBoard({header, data, actionList}:IActionBoard){
    return (
    <>
        <Card variant="outlined" sx={{ boxShadow: 4, maxWidth: 460, margin:'0 auto 1rem auto'}}>
        <CardHeader title={header} subheader={data}/>
            <CardContent sx={{textAlign:'left'}}>
                {actionList.map((action,index)=><BoardContent key={`AB-${header}-${index}`} name={action.name} descriptionsList={action.descriptionsList}/>)}
            </CardContent>
        </Card>
    </>)
}