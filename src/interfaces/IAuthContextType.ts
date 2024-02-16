import IUser from "./IUser";
export default interface IAuthContextType{
    user: IUser;
    signin: (username: string, password:string, callback: (isLoggedIn:boolean)=>void) => void;
    signout: (callback: VoidFunction) => void;
}