import IUserErrors from "./IUserErrors";
import { IUserStore } from "./IUserRedux";

export default interface IAuthorizethion{
    errors:IUserErrors[] | null,
    user: IUserStore | null,
    pending:boolean,
    showSignInDialog:boolean,
    showSignUpDialog:boolean,
    redirectTo?:string,
    isSignInSuccess:boolean,
    isSignUpSuccess:boolean
}