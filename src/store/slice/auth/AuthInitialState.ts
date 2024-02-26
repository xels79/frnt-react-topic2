import IAuthorizethion from "../../../interfaces/IAuthorizethion"
import { IUserStore } from "../../../interfaces/IUserRedux"

export const initialState= ():IAuthorizethion=>{
    if (window.localStorage.getItem("TesyReacyProject_userStore")){
        return {
            user:JSON.parse(window.localStorage.getItem("TesyReacyProject_userStore") as string) as IUserStore,
            errors:null,
            pending:false,
            showSignInDialog:false,
            showSignUpDialog:false,
            redirectTo:'',
            isSignInSuccess:false,
            isSignUpSuccess:false,
        }
    }else{
        return {
            user:null,
            errors:null,
            pending:false,
            showSignInDialog:false,
            showSignUpDialog:false,
            redirectTo:'',
            isSignInSuccess:false,
            isSignUpSuccess:false
        }
    }
}
