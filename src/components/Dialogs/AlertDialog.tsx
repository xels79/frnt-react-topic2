import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

export default function AlertDialog({
    open,
    header='Заголовок',
    message,
    onClose=()=>{},
    cancelClick=onClose,
    okClick=onClose
}:{
    open:boolean,
    header?:string,
    message:string,
    okClick?:()=>void,
    cancelClick?:()=>void
    onClose:()=>void
}){  
    return (
        <React.Fragment>
            <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {header}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelClick}>Нет</Button>
                <Button onClick={okClick} autoFocus>Да</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}