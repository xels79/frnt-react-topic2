import IUser from "./IUser";
import IUserErrors from "./IUserErrors";
export default interface IAuthContextType{
    user: IUser;
    signin: (username: string, password:string, callback: (isLoggedIn:boolean, errors:IUserErrors[] | null)=>void) => void;
    signup: (user:IUser, callback: (isLoggedIn:boolean, errors:IUserErrors[] | null)=>void) => void;
    signout: (callback: VoidFunction) => void;
    userCount: ()=>number
}