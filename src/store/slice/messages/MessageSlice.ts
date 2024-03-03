import { PayloadAction, createSlice } from '@reduxjs/toolkit'
let _id=1;
export interface IMessage{
    id?:number,
    type:"success"|"info"|"warning"|"error",
    durration?:number,
    message:string,
    show?:boolean
}
// export const addMessage = createAction<IMessage, 'userUpdateSOMB'>('userUpdateSOMB')
const initialState:IMessage[]=[];
export const slice = createSlice({
    name:"messages",
    initialState,
    reducers:{
        removeMessages:(state, action: PayloadAction<number>)=>{
            // console.log('removeMessages',state,action);
            return state.filter(item=>item.id!==action.payload);
        },
        addMessage:(state, action: PayloadAction<IMessage>)=>{
            state.push({
                id:_id++,
                type:action.payload.type,
                durration:action.payload.durration?action.payload.durration:5000,
                message:action.payload.message,
                show:true
            });
        },
        hideMessage:(state, action:PayloadAction<number>)=>{
            const item = state.find((item)=>item.id===action.payload);
            if (item){
                item.show = false;
            }
        }
    },
});
export const { removeMessages, addMessage, hideMessage} = slice.actions;
export default slice.reducer;