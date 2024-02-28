import { Divider, Stack } from "@mui/material";
import AddTodo from '../../components/AddTodo/Addtodo'
import BoardPagination from './BoardsPagination'

    export default function BoardFooter() {
        return <>
            <Divider orientation="horizontal" />
            <Stack divider={<Divider orientation="horizontal" />}><AddTodo/><BoardPagination/></Stack>
            </>
    }