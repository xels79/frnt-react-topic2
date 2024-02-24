import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginMinServerAnswer } from "../../../interfaces/ILoginSignIn";

const LogoutThunk = createAsyncThunk<
    null,
    null,
    {
        rejectValue:string
    }
    >('auth/LogoutThunk', async (user, thunkApi) => {
    try{
        const response = (await fetch(`/api/logout.php`,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({LoginForm:user})
        })
        .then(answer=>answer.json())) as ILoginMinServerAnswer;
        if (response.status==='not auth'){
            return null;//user;
        }else{
            console.log('Ошибки:', response);
            return thunkApi.rejectWithValue('Ошибка сервера');    
        }
        
    }catch(error){
        console.error(error);
        return thunkApi.rejectWithValue("Ошибка сервера");
    }
})

export default LogoutThunk;