import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export interface IBreadcrumbsItem{
    link:string|null,
    label:string
}
export interface IBreadcrumbsSlice{
    items:IBreadcrumbsItem[]
}
// export const addMessage = createAction<IMessage, 'userUpdateSOMB'>('userUpdateSOMB')
const initialState:IBreadcrumbsSlice={
    items:[]
};
export const slice = createSlice({
    name:"breadCrumbs",
    initialState,
    reducers:{
        addBreadCrumbs:(state, action:PayloadAction<IBreadcrumbsItem[]>)=>{
            state.items = action.payload;
        },
        //clearBreadCrumbs:state=>{state=[];}
    },
});
export const { addBreadCrumbs } = slice.actions;
export default slice.reducer;