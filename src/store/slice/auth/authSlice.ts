import { createSlice } from '@reduxjs/toolkit'
import IUser from '../../../interfaces/IUser'
import IUserErrors from '../../../interfaces/IUserErrors';
interface IAuthorizethion{
    errors:IUserErrors[] | null,
    user: IUser | null,
    token:string
}
const initialState:IAuthorizethion= {
    user:null,
    token:'',
    errors:null
}
export const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state:IAuthorizethion, action:{payload:IAuthorizethion | null})=>{
            if (action.payload && action.payload.user && action.payload.token){
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.errors = null;
            }else if (action.payload && action.payload.errors){
                state.errors=action.payload.errors;
            }else{
                state.errors = [{type:'manual',name:'password', message:'Неизвестеая ошибка'}]
            }
        }
    }
});

export const { setUser } = slice.actions;
export default slice.reducer;