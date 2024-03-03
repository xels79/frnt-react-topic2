import { Divider, Stack } from "@mui/material";
import AddTodo from '../AddTodo/Addtodo'
import BoardPagination from './TaskPagination'

    export default function TaskFooter() {
        return <>
            <Divider orientation="horizontal" />
            <Stack divider={<Divider orientation="horizontal" />}><AddTodo/><BoardPagination/></Stack>
            </>
    }