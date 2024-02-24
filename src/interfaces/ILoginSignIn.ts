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
    password?:string[]
}

export interface ILoginSignInServerAnswer extends ILoginMinServerAnswer{
    LoginForm?:IUser|ILoginSignInServerErrors|IUserStore,
    SignUpForm?:ISignUpUser|ILoginSignInServerErrors,
    token?:string,
    id?:number,
    username?:string,
}