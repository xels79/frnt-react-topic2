import { IDefaultServerError, IUserUpdateServerErrors } from "../../../interfaces/ILoginSignIn";
import { createAsyncThunk } from "@reduxjs/toolkit";
import  LogoutThunk  from '../auth/LogoutThunk'
import { IUserRESTServerError, IUserToServer } from "../../../interfaces/IUserRedux";
import prepareRESTErrorMessages from "../auth/prepareRESTErrorMessages";
import IUserErrors from "../../../interfaces/IUserErrors";
export const UserSaveThunk = createAsyncThunk
    <boolean,IUserToServer,{rejectValue:string|IUserErrors[]}>
    ('UserRest/Save', async (data, thunkApi) => {
        console.log('UserRest/Save');
        try{
            const response = (await fetch(`/api/users/${data.id}`,{
                method:'PUT',
                body:JSON.stringify(data.user)
            }).then(answer=>answer.json()));
            const asError = response as IDefaultServerError;
            if (response instanceof Array){
                return thunkApi.rejectWithValue(prepareRESTErrorMessages(response as IUserRESTServerError[]) as IUserErrors[]);
                // return false;
            }else{
                if (asError.name && asError.name ==="Unauthorized"){
                    console.error('UserRest/Save', response);    
                    thunkApi.dispatch(LogoutThunk(null));
                    return false;
                }else if(asError.type && asError.type ==="Error"){
                    return thunkApi.rejectWithValue("Ошибка сервера");
                    // return false;
                }else{
                    return true;
                }
            }
        }catch(error){
            console.error('UserRest/Save', error);
            return thunkApi.rejectWithValue("Ошибка сервера");
        }
    });