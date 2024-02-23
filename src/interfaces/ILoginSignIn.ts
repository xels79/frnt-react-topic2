import IUser, { ISignUpUser } from "./IUser"
export interface ILoginSignInServerErrors{
    email?:string[],
    firstName?:string[],
    lastName?:string[],
    newpassword?:string[],
    username?:string[],
    password?:string[]
}

export interface ILoginSignInServerAnswer{
    LoginForm?:IUser|ILoginSignInServerErrors,
    SignUpForm?:ISignUpUser|ILoginSignInServerErrors,
    status?:string,
    token?:string,
    id?:number,
    username?:string,
}