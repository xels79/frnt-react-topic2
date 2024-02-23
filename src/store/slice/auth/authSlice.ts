import { IUserStore } from './../../../interfaces/IUser';
import { ILoginSignInServerAnswer,ILoginSignInServerErrors } from './../../../interfaces/ILoginSignIn';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import IUser, { IUserLogin } from '../../../interfaces/IUserRedux'
import IUserErrors, { TErrorNames } from '../../../interfaces/IUserErrors';
// import { YII2AuthProvider } from '../../../providers/YII2AuthProvider';
interface IAuthorizethion{
    errors:IUserErrors[] | null,
    user: IUserStore | null,
}
const initialState:IAuthorizethion= {
    user:null,
    errors:null
}
const prepareErrorMessages = (serverErrors:ILoginSignInServerErrors):IUserErrors[]=>{
    const errKeys:TErrorNames[] = Object.keys(serverErrors) as TErrorNames[];
    const _errors:IUserErrors[] = errKeys.map((eKey:TErrorNames):IUserErrors=>{
        const tmp2:string[]|undefined = serverErrors[eKey];
        const _message:string=tmp2?tmp2.join(' '):'';
        return {
            type:'server',
            name:eKey,
            message:_message
        }
    });
    console.log('errors',serverErrors,_errors);
    return _errors;
}
const LoginChunk = createAsyncThunk<
    ILoginSignInServerAnswer,
    IUserLogin,
    {
        // rejectValue:ILoginSignInServerErrors
    }
    >('auth/LoginChunk', async (user, thunkApi) => {
    try{
        const response = (await fetch(`/api/login.php`,{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({LoginForm:user})
        })
        .then(answer=>answer.json())) as ILoginSignInServerAnswer;
        return response;
        // if (response.status === 'logged'){
        //     return response.LoginForm;
        // }else{
        //     if (response.LoginForm){
        //         return thunkApi.rejectWithValue(response.LoginForm as ILoginSignInServerErrors);
        //     }else{
        //         //return thunkApi.rejectWithValue((await ((function(){return {username:['Ошибка сервера.']}})()))as ILoginSignInServerErrors)
        //     }
        // }
        
    }catch(error){
        console.error(error);
        //return thunkApi.rejectWithValue({} as ILoginSignInServerErrors);
    }
})
export const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state:IAuthorizethion, action:{payload:IAuthorizethion | null})=>{
            if (action.payload && action.payload.user){
                state.user = action.payload.user;
                state.errors = null;
            }else if (action.payload && action.payload.errors){
                state.errors=action.payload.errors;
            }else{
                state.errors = [{type:'manual',name:'password', message:'Неизвестеая ошибка'}]
            }
        },
        //loginL:
    },
    extraReducers: (builder) => {
        builder.addCase(LoginChunk.fulfilled, (state, { payload }) => {
            //state.user = payload
        if (payload.status === 'logged' && payload.LoginForm){
            state.user = payload.LoginForm as IUserStore;
        }else if (payload.LoginForm){
            state.user = null;
            state.errors = prepareErrorMessages(payload.LoginForm as ILoginSignInServerErrors);
        }
        //     return response.LoginForm;
        // }else{
        //     if (response.LoginForm){
        //         return thunkApi.rejectWithValue(response.LoginForm as ILoginSignInServerErrors);
        //     }else{
        //         //return thunkApi.rejectWithValue((await ((function(){return {username:['Ошибка сервера.']}})()))as ILoginSignInServerErrors)
        //     }
        // }

        })
        builder.addCase(LoginChunk.rejected, (state, action) => {
            state.user = null;
            if (action.payload) {
                // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
                state.errors = prepareErrorMessages(action.payload);
            } else {
                console.error(action.error.code, action.error.name, action.error.message);
            }
        })
    }
});

export const { setUser } = slice.actions;
export {LoginChunk};
export default slice.reducer;