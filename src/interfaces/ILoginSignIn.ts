import IUser,{ IUserStore,ISignUpUser } from "./IUserRedux"
export interface ILoginMinServerAnswer{
    status?:string,
}
export interface ILoginSignInServerErrors{
    email?:string[],
    firstName?:string[],
    lastName?:string[],
    newpassword?:string[],
    username?:string[],
    password?:string[],
    oldpassword?:string[],
    id?:string[]
}
export interface IDefaultServerError{
    code:number,
    message:string,
    name:string,
    type:string,
    status:number
}
export interface IUserUpdateServerErrors{
    id?:string[],
    email?:string[],
    firstName?:string[],
    lastName?:string[],
    newpassword?:string[],
    username?:string[],
    oldpassword?:string[]
}
export interface ILoginSignInServerAnswer extends ILoginMinServerAnswer{
    LoginForm?:IUser|ILoginSignInServerErrors|IUserStore,
    SignUpForm?:ISignUpUser|ILoginSignInServerErrors,
    token?:string,
    id?:number,
    username?:string,
}