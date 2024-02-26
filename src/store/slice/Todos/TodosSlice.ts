import { createSlice } from '@reduxjs/toolkit'
import {TodosGet} from './TodosGet'
import { ITodo, ITodoServerErrors } from '../../../interfaces/ITodo'

export interface ITodoState{
    pending:boolean,
    todos:ITodo[]
    errors:ITodoServerErrors[] | null,
    needUpdate:boolean,
    message:{
        type:'ok'|'error',
        text:string
    }|null
}

const initialState:ITodoState = {
    pending:false,
    todos:[],
    errors:null,
    message:null,
    needUpdate:true
}

export const slice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        clearMessage:(state)=>{console.log('action clearMessage');state.message=null;},
        setNeedUpdate:state=>{state.needUpdate = true},
        clearNeedUpdate:state=>{state.needUpdate = false},
    },
    extraReducers:(builder)=>{
        builder.addCase(TodosGet.fulfilled, (state, { payload })=>{
            state.pending = false;
            state.todos = payload;
            state.message = null;
        })
        builder.addCase(TodosGet.rejected, (state, action)=>{
            state.pending = false;
            if (action.payload){
                state.message = {type:"error", text:action.payload as string}
            }else{
                console.error(action.error.code, action.error.name, action.error.message);
                state.message = {type:"error", text:"Ошибка сервера"}
            }
        })
        builder.addCase(TodosGet.pending, state=>{
            state.pending = true;
        });
    }
});
export const { clearMessage, setNeedUpdate, clearNeedUpdate } = slice.actions;
export default slice.reducer;