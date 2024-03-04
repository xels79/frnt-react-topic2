import { IUserStore } from './../../../interfaces/IUserRedux';
import { initialState } from './AuthInitialState';
import { createAction, createSlice } from '@reduxjs/toolkit'
import LoginThunk from './LoginThunk';
import LogoutThunk from './LogoutThunk';
import SigUpThunk from './SigUpThunk';
import prepareErrorMessages from './prepareErrorMessages';
export const internalUpdateUser = createAction<IUserStore|null, 'userUpdate'>('userUpdate')
export const setShowOnlyMyBoards = createAction<{
    showOnlyMyBoards:boolean,
    boardsPageItemCount:number,
    showEmpty:boolean,
    showReady:boolean
}, 'userUpdateSOMB'>('userUpdateSOMB')
export const setShowReadyBoards = createAction<boolean, 'userUpdateSRB'>('userUpdateSRB')
export const setShowEmptyBoards = createAction<boolean, 'userUpdateSEB'>('userUpdateSEB')
export const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        showSignIn:state=>{state.showSignInDialog=true},
        showSignUp:state=>{state.showSignUpDialog=true},
        hideSignIn:state=>{state.showSignInDialog=false},
        hideSignUp:state=>{state.showSignUpDialog=false},
        setSignSuccess:state=>{state.isSignInSuccess=true},
        resetSignSuccess:state=>{state.isSignInSuccess=false},
        setSignUpSuccess:state=>{state.isSignUpSuccess=true},
        resetSignUpSuccess:state=>{state.isSignUpSuccess=false},
        redirectDone:state=>{state.redirectTo=''},
    },
    extraReducers: (builder) => {
        builder.addCase(internalUpdateUser, (state, { payload })=>{
            state.user = payload;
            window.localStorage.setItem("TesyReacyProject_userStore",JSON.stringify(state.user));
        })
        builder.addCase(setShowReadyBoards, (state, { payload })=>{
            if (state.user){
                if (state.user.option){
                    state.user.option.showReady = payload;
                }else{
                    state.user.option = {
                        showOnlyMyBoards:false,
                        boardsPageItemCount:3,
                        showEmpty:true,
                        showReady:payload
                    }
                }
                window.localStorage.setItem("TesyReacyProject_userStore",JSON.stringify(state.user));
            }
        })
        builder.addCase(setShowEmptyBoards, (state, { payload })=>{
            if (state.user){
                if (state.user.option){
                    state.user.option.showEmpty = payload;
                }else{
                    state.user.option = {
                        showOnlyMyBoards:false,
                        boardsPageItemCount:3,
                        showEmpty:payload,
                        showReady:true
                    }
                }
                window.localStorage.setItem("TesyReacyProject_userStore",JSON.stringify(state.user));
            }
        })
        builder.addCase(setShowOnlyMyBoards, (state, { payload })=>{
            if (state.user){
                if (state.user.option){
                    state.user.option = payload;
                }
                window.localStorage.setItem("TesyReacyProject_userStore",JSON.stringify(state.user));
            }
        })
        builder.addCase(LoginThunk.fulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.user.option={showOnlyMyBoards:false,boardsPageItemCount:3,showEmpty:true,showReady:true};
            state.redirectTo = payload.redirectTo;
            state.pending = false;
            // state.showSignInDialog = false;
            window.localStorage.setItem("TesyReacyProject_userStore",JSON.stringify(payload.user));
        })
        builder.addCase(LoginThunk.rejected, (state, action) => {
            state.user = null;
            state.pending = false;
            window.localStorage.removeItem("TesyReacyProject_userStore");
            if (action.payload) {
                // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
                state.errors = prepareErrorMessages(action.payload);
            } else {
                console.error(action.error.code, action.error.name, action.error.message);
            }
        })
        builder.addCase(LoginThunk.pending, (state)=>{
            state.pending = true;
        })
        builder.addCase(SigUpThunk.fulfilled, (state, { payload }) =>{
            state.user = payload.user;
            state.user.option={showOnlyMyBoards:false,boardsPageItemCount:3,showEmpty:true,showReady:true};
            state.redirectTo = payload.redirectTo;
            state.pending = false;
            // state.showSignInDialog = false;
            console.log('SignUp ok',payload);
            window.localStorage.setItem("TesyReacyProject_userStore",JSON.stringify(payload.user));
        })
        builder.addCase(SigUpThunk.rejected, (state, action) => {
            state.user = null;
            state.pending = false;
            window.localStorage.removeItem("TesyReacyProject_userStore");
            if (action.payload) {
                // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
                state.errors = prepareErrorMessages(action.payload);
            } else {
                console.error(action.error.code, action.error.name, action.error.message);
            }
        })
        builder.addCase(SigUpThunk.pending, (state)=>{
            state.pending = true;
        })
        builder.addCase(LogoutThunk.fulfilled,(state, {payload})=>{
            state.errors=null;
            state.pending=false;
            state.user=null;
            if (typeof(payload)==='string'){
                state.redirectTo=payload;
            }
            window.localStorage.removeItem("TesyReacyProject_userStore");
        })
        builder.addCase(LogoutThunk.rejected,(state)=>{
            state.errors=null;
            state.pending=false;
            state.user=null;
            window.localStorage.removeItem("TesyReacyProject_userStore");
        })
        builder.addCase(LogoutThunk.pending, (state)=>{
            state.pending=true;
        })
    }
});

export const { showSignIn, showSignUp, hideSignIn, hideSignUp, redirectDone, setSignSuccess, resetSignSuccess, setSignUpSuccess, resetSignUpSuccess } = slice.actions;
export default slice.reducer;