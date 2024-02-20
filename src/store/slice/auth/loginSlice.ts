import { createSlice } from '@reduxjs/toolkit'
import IUser from '../../../interfaces/IUser'
interface IAuthorizethion{
    isLoadin:boolean,
    user: IUser | null,
    token:string
}
const initialState= {
    user:null,
    token:'',
    isLoading:false
}
export const loginSlice = createSlice({
    name:"loginauth",
    initialState,
    reducers:{
        login:()=>{

        }
    }
});
// export const lodinSlice = createSlice({
//     name:'loginSlice',
// //    initialSate,
//     reducers:{
//         login: (state)=>state
//     }
// });