import { TErrorNames } from "./IUserErrors"

export interface IUserBase{
    username:string
}
export interface IUserLogin extends IUserBase{
    password:string
}
export interface IUserStore extends IUserBase{
    firstName:string,
    lastName:string,
    id:number
}
export default interface IUser extends IUserLogin, IUserStore{
    email:string,
}
export interface ISignUpUser extends IUser{
    newpassword:string
    token?:string
}
export interface IToSignUp{
    user:ISignUpUser,
    redirectTo?:string
}
export interface IToLogin{
    user:IUserLogin,
    redirectTo?:string
}
export interface IToStore{
    user:IUserStore,
    redirectTo?:string
}
export interface IUserToServer{
    id:number,
    user:IUserUpdate
}
export interface IUserUpdate extends ISignUpUser{
    id:number,
    oldpassword:string
}
export interface IUserRESTServerError{
    field:TErrorNames,
    message:string
}
