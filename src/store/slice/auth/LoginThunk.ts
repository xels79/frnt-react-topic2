import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserStore, IToLogin, IToStore } from "../../../interfaces/IUserRedux";
import { ILoginSignInServerAnswer, ILoginSignInServerErrors } from "../../../interfaces/ILoginSignIn";
import { hideSignIn, setSignSuccess } from './authSlice'
const LoginThunk = createAsyncThunk<
    IToStore,   
    IToLogin,
    {
        rejectValue:ILoginSignInServerErrors
    }
    >('auth/LoginChunk', async (data, thunkApi) => {
        console.log('thunkApi', thunkApi);
        try{
            const response = (await fetch(`/api/login.php`,{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({LoginForm:data.user})
            })
            .then(answer=>answer.json())) as ILoginSignInServerAnswer;
            if (response.status==='logged'){
                thunkApi.dispatch(hideSignIn());
                thunkApi.dispatch(setSignSuccess());
                return {user:response.LoginForm as IUserStore, redirectTo:data.redirectTo};
            }else{
                console.log('Ошибки:', response);
                return thunkApi.rejectWithValue(response.LoginForm as ILoginSignInServerErrors);    
            }
            
        }catch(error){
            console.error(error);
            return thunkApi.rejectWithValue({username:["Ошибка сервера"]} as ILoginSignInServerErrors);
        }
})

export default LoginThunk;