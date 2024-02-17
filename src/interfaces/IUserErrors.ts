export default interface IUserErrors{
    type:string,
    name:'username' | 'firstName' | 'lastName' | 'email' | 'password',
    message:string
}