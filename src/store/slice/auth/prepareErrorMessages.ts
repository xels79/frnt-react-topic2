import { ILoginSignInServerErrors } from "../../../interfaces/ILoginSignIn";
import IUserErrors, { TErrorNames } from "../../../interfaces/IUserErrors";

export default function prepareErrorMessages(serverErrors:ILoginSignInServerErrors):IUserErrors[]{
    const errKeys:TErrorNames[] = Object.keys(serverErrors) as TErrorNames[];
    const _errors:IUserErrors[] = errKeys.map((eKey:TErrorNames):IUserErrors=>{
        const tmp2:string[]|undefined = serverErrors[eKey];
        const _message:string=tmp2?tmp2.join(' '):'';
        return {
            type:'server',
            name:eKey,
            message:_message
        }
    });
    console.log('errors',serverErrors,_errors);
    return _errors;
}