import { IUserUpdate } from "../../../interfaces/IUserRedux";
import { IDefaultServerError, IUserUpdateServerErrors } from "../../../interfaces/ILoginSignIn";
import { createAsyncThunk } from "@reduxjs/toolkit";
import  LogoutThunk  from '../auth/LogoutThunk'
export const UserGetThunk = createAsyncThunk
    <IUserUpdate|null,number,{rejectValue:IUserUpdateServerErrors}>
    ('UserRest/Get', async (data, thunkApi) => {
        console.log('UserRest/Get');
        try{
            const response = (await fetch(`/api/users/${data}`).then(answer=>answer.json()));
            const asError = response as IDefaultServerError;
            if (asError.name && asError.name ==="Unauthorized"){
                console.error('UserRest/List', response);    
                thunkApi.dispatch(LogoutThunk(null));
                return null;
            }else if(asError.type && asError.type ==="Error"){
                thunkApi.rejectWithValue({username:["Ошибка сервера"]} as IUserUpdateServerErrors);
                return null;
            }else{
                return response as IUserUpdate;
            }
        }catch(error){
            console.error('UserRest/List', error);
            return thunkApi.rejectWithValue({username:["Ошибка сервера"]} as IUserUpdateServerErrors);
        }
    });