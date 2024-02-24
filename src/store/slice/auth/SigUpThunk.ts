import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserStore, IToSignUp, IToStore } from "../../../interfaces/IUserRedux";
import { ILoginSignInServerAnswer, ILoginSignInServerErrors } from "../../../interfaces/ILoginSignIn";
import { hideSignIn, setSignUpSuccess } from './authSlice'
const SigUpThunk = createAsyncThunk<
    IToStore,   
    IToSignUp,
    {
        rejectValue:ILoginSignInServerErrors
    }
    >('auth/SignUpChunk', async (data, thunkApi) => {
        console.log('thunkApi', thunkApi);
        try{
            const response = (await fetch(`/api/newuser.php`,{
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({SignUpForm:data.user})
            })
            .then(answer=>answer.json())) as ILoginSignInServerAnswer;
            if (response.status==='logged'){
                thunkApi.dispatch(hideSignIn());
                thunkApi.dispatch(setSignUpSuccess());
                return {user:response.SignUpForm as IUserStore, redirectTo:data.redirectTo};
            }else{
                console.log('Ошибки:', response);
                return thunkApi.rejectWithValue(response.SignUpForm as ILoginSignInServerErrors);    
            }
            
        }catch(error){
            console.error(error);
            return thunkApi.rejectWithValue({username:["Ошибка сервера"]} as ILoginSignInServerErrors);
        }
})

export default SigUpThunk;