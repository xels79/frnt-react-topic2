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
export interface IUserServerError{
    
}