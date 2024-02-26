import { Divider, Grid, Paper, Radio, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { ITodoAction } from "../../interfaces/ITodo"
import React, { useState } from "react";
export interface  IActionList{
    name:string,
    descriptionsList?:string[]
};

export default function BoardContent({todoAction}
    :{
        todoAction:ITodoAction
    }){
        const [status, setStatus] = useState(todoAction.status as number);

        const handleChange = (
            event: React.MouseEvent<HTMLElement>,
            newAlignment: number,
        ) => {
            setStatus(+newAlignment);
        };

    return (
        <Paper elevation={3} sx={{padding:'1rem 2rem 1rem 2rem', mb:2}}>
            <Stack 
                spacing={1}
                divider={<Divider orientation="horizontal" flexItem />}
            >
                <Typography sx={{ fontSize: '1.2rem' }} color="text.primary" gutterBottom>{todoAction.name}</Typography>
                <Grid container justifyContent="flex-end">
                    <ToggleButtonGroup
                        color="primary"
                        value={status}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        size="small"
                        
                        >
                        <ToggleButton sx={{ fontSize: '.7em' }} color="error" value={0}>Ждёт</ToggleButton>
                        <ToggleButton sx={{ fontSize: '.7em' }} color="primary" value={1}>В работе</ToggleButton>
                        <ToggleButton sx={{ fontSize: '.7em' }} color="success" value={2}>Закончен</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Stack>
        </Paper>
    )
}