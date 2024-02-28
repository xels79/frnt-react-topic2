import { RootState } from '../../store/Store'
import { useSelector } from 'react-redux';
import { Alert, Snackbar, Stack } from '@mui/material';
import { hideMessage, removeMessages } from '../../store/slice/messages/MessageSlice';
import useAppDispatch from '../../hooks/AppDispatch';

export default function SystemMessages(){
    const messages = useSelector((state:RootState)=>state.MessageSlice);
    const dispatch = useAppDispatch();
    return (
        <Stack spacing={1}>
            {messages.map(item=><Snackbar
                key={`message-toast-${item.id}`}
                open={item.show}
                autoHideDuration={item.durration}
                onClose={()=>{dispatch(hideMessage(item.id as number))}}
                //onClosed={()=>{dispatch(removeMessages(item.id as number))}}
                TransitionProps={{onExited:()=>{dispatch(removeMessages(item.id as number))}}}  
            >
                <Alert
                    severity={item.type}
                    variant="filled"
                    sx={{ width: '100%' }}
                >{item.message}</Alert>

            </Snackbar>)}
        </Stack>
    )
}