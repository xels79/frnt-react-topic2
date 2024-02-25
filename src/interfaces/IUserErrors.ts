export type TErrorNames = 'username' | 'firstName' | 'lastName' | 'email' | 'password' | 'newpassword' | 'oldpassword' | 'id';

export default interface IUserErrors{
    type:string,
    name:TErrorNames,
    message:string
}

