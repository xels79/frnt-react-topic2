import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo, ITodoServerErrors } from "../../../interfaces/ITodo";
import LogoutThunk from "../auth/LogoutThunk";

export const TodosGet = createAsyncThunk
    <ITodo[], undefined, {rejectValue:ITodo | string}>
    ('todo/get', async (data, thunkApi) => {
        try{
            const response = (await fetch("/api/todos?expand=todoActions").then(answer=>answer.json()));
            const asError = response as ITodoServerErrors;
            if (asError.name && asError.name ==="Unauthorized"){
                console.error('UserRest/List', response);    
                thunkApi.dispatch(LogoutThunk(null));
                return thunkApi.rejectWithValue("Требуется авторизация");
            }else if(asError.type && asError.type ==="Error"){
                return thunkApi.rejectWithValue("Ошибка сервера");
            }else{
                return response as ITodo[];
            }
        }catch(error){
            console.error('UserRest/List', error);
            return thunkApi.rejectWithValue("Ошибка сервера");
        }
    });