import { IUserStore } from './../../../interfaces/IUserRedux';
import { RootState } from './../../Store';
import { IDefaultServerError, } from "../../../interfaces/ILoginSignIn";
import { createAsyncThunk } from "@reduxjs/toolkit";
import  LogoutThunk  from '../auth/LogoutThunk'
import { IUserRESTServerError, IUserToServer } from "../../../interfaces/IUserRedux";
import prepareRESTErrorMessages from "../auth/prepareRESTErrorMessages";
import IUserErrors from "../../../interfaces/IUserErrors";
import { internalUpdateUser } from '../auth/authSlice';
export const UserSaveThunk = createAsyncThunk
    <boolean,IUserToServer,{rejectValue:string|IUserErrors[]}>
    ('UserRest/Save', async (data, thunkApi) => {
        console.log('UserRest/Save');
        const st = thunkApi.getState() as RootState;
        const needRelog = (st.UserRest.user?.username !== data.user.username) || data.user.newpassword;
        // const serverData:IUserServerData={};
        // serverData.newemail = data.user.email;
        // serverData.newusername = data.user.username;
        try{
            const response = (await fetch(`/api/users/${data.id}`,{
                method:'PUT',
                'headers':{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data.user)
            }).then(answer=>answer.json()));
            const asError = response as IDefaultServerError;
            const toStore:IUserStore = {
                username:(<IUserStore>response).username,
                firstName:(<IUserStore>response).firstName,
                lastName:(<IUserStore>response).lastName,
                id:data.id
            }
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
                    if (needRelog){
                        thunkApi.dispatch(LogoutThunk('/profile'))
                    }else{
                        thunkApi.dispatch(internalUpdateUser(toStore));
                    }
                    return true;
                }
            }
        }catch(error){
            console.error('UserRest/Save', error);
            return thunkApi.rejectWithValue("Ошибка сервера");
        }
    });