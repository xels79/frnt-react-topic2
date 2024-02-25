import IUserErrors from "../../../interfaces/IUserErrors";
import { IUserRESTServerError } from "../../../interfaces/IUserRedux";
export default function prepareRESTErrorMessages(serverErrors:IUserRESTServerError[]):IUserErrors[]{
    return serverErrors.map((item:IUserRESTServerError):IUserErrors=>{
        return {
            type:'server',
            name:item.field,
            message:item.message
        }
    });
}