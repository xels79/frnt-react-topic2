import { createSlice } from '@reduxjs/toolkit'
import { UserGetThunk } from './UserGetThunk'
import { IUserUpdate } from '../../../interfaces/IUserRedux'
import { UserSaveThunk } from './UserSaveThunk'
import IUserErrors from '../../../interfaces/IUserErrors'
import prepareErrorMessages from '../auth/prepareErrorMessages'
export interface IUUState{
    pending:boolean,
    user:IUserUpdate | null,
    errors:IUserErrors[] | null,
    message:{
        type:'ok'|'error',
        text:string
    }|null
}
const initialState:IUUState = {
    pending:false,
    user:null,
    errors:null,
    message:null
};

export const slice = createSlice({
    name: 'UserRest',
    initialState,
    reducers:{
        clearMessage:(state)=>{
            console.log('UserRest action clearMessage');
            state.message=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(UserGetThunk.fulfilled, (state, { payload })=>{
            state.message=null;
            // state.message = {type:"error", text:"Тестовое"}
            state.pending=false;
            state.user = payload;
        })
        builder.addCase(UserGetThunk.rejected, (state, action)=>{
            state.pending = false;
            state.message = {type:"error", text:"Ошибка сохранения"}
            if (action.payload) {
                // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
                state.errors = prepareErrorMessages(action.payload);
            } else {
                console.error(action.error.code, action.error.name, action.error.message);
            }
        })
        builder.addCase(UserGetThunk.pending, (state) => {
            state.pending = true;
        })
        builder.addCase(UserSaveThunk.fulfilled, (state, action) => {
            state.pending = false;
            state.errors = null;
            console.log('UserSaveThunk.fulfilled',action);
            if (!action.payload){
                state.message = {type:"error", text:"Ошибка сохранения"}
            }else{
                state.message = {type:"ok", text:"Сохранено"}
            }
        })
        builder.addCase(UserSaveThunk.rejected, (state, action)=>{
            state.pending = false;
            state.message = {type:"error", text:"Ошибка сохранения"}
            console.log('UserSaveThunk.rejected',action);
            if (action.payload){
                if (action.payload instanceof Array) {
                // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
                    state.errors = action.payload;
                }else{
                    state.errors = null;
                    state.message={type:"error", text:action.payload};
                }
            } else {
                console.error(action.error.code, action.error.name, action.error.message);
            }
        })
        builder.addCase(UserSaveThunk.pending, (state) => {
            state.pending = true;
        })
    },
});
export const { clearMessage } = slice.actions;
export default slice.reducer;