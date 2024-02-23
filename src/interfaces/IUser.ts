export default interface IUser{
    username:string,
    firstName?:string,
    lastName?:string,
    email?:string,
    password?:string
}
export interface ISignUpUser extends IUser{
    newpassword?:string
}