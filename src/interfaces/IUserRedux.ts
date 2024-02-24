export interface IUserBase{
    username:string
}
export interface IUserLogin extends IUserBase{
    password:string
}
export interface IUserStore extends IUserBase{
    firstName?:string,
    lastName?:string,
}
export default interface IUser extends IUserLogin, IUserStore{
    email:string,
}
export interface ISignUpUser extends IUser{
    newpassword:string
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

