export type TErrorNames = 'username' | 'firstName' | 'lastName' | 'email' | 'password';
export default interface IUserErrors{
    type:string,
    name:TErrorNames,
    message:string
}