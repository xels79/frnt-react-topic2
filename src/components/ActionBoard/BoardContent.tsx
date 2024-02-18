import { Paper, Typography } from "@mui/material"
export interface  IActionList{
    name:string,
    descriptionsList?:string[]
};

export default function BoardContent({name,descriptionsList = []}:IActionList){
    return (
        <Paper elevation={3} sx={{padding:'1rem 2rem 1rem 2rem', mb:2}}>
            <Typography sx={{ fontSize: '1.2rem' }} color="text.primary" gutterBottom>{name}</Typography>
            {descriptionsList.map(description=><Typography sx={{ mb: .125 }} color="text.secondary" variant='body2'>{description}</Typography>)}
        </Paper>
    )
}