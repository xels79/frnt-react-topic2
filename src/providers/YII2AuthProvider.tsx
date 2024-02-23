/**
 * This represents some generic auth provider API, like Firebase.
 */
// import IUser from "../interfaces/IUser";
import IUser, {ISignUpUser} from "../interfaces/IUser";
import IUserErrors, { TErrorNames } from "../interfaces/IUserErrors";
import { ILoginSignInServerAnswer, ILoginSignInServerErrors } from "../interfaces/ILoginSignIn";

class YII2AuthProvider{
    private static _isAuthenticated:boolean = false;
    static usersCount = 1;
    private static cFetch(actionName:string,method:'POST'|'GET' = 'GET',body:string|null = null):Promise<Response>{
        return fetch(`/api/${actionName}`,{
            method:method,
            headers:{'Content-Type': 'application/json'},
            body:body
        });
    }
    private static prepareErrorMessages(serverErrors:ILoginSignInServerErrors):IUserErrors[]{
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
    private static getUserById(id:number,callBackResult:(result:IUser|ISignUpUser|null)=>void):void{
        YII2AuthProvider.cFetch(`users/${id}`,'GET')
        .then(anwer=>anwer.json())
        .then(result=>callBackResult(result as IUser|ISignUpUser))
        .catch(error=>{
            console.error(error);
            callBackResult(null);
        });
    }
    private static createResult(username:string ,result:IUser | ISignUpUser):IUser{
        return {
            username:username,
            firstName:result.firstName,
            lastName:result.lastName
        }
    }
    private static proceedAnswer = (username:string,result:ILoginSignInServerAnswer,callback: (user:IUser | null, _errors:IUserErrors[] | null)=>void)=>{
        if (result.status === 'logged' && result.id){// && result?.token){
            YII2AuthProvider.getUserById(result.id,result2=>{
                if (result2!== null){
                    console.log(result2);
                    YII2AuthProvider._isAuthenticated = true;
                    callback(YII2AuthProvider.createResult(username, result2), null);
                }else{
                    console.error('Ошибка сервера');
                    callback(null,null);
                }
            });
        }else if (result.status === 'error'){
            YII2AuthProvider._isAuthenticated = false;
            const errorInfo:ILoginSignInServerErrors=(result.LoginForm?result.LoginForm:(result.SignUpForm?result.SignUpForm:{})) as ILoginSignInServerErrors;
            callback(null, YII2AuthProvider.prepareErrorMessages(errorInfo));
        }else{
            YII2AuthProvider._isAuthenticated = false;
            console.warn('Не известная ошибка!',result);
        }
    }
    static preGet(cb:()=>void){
        fetch("/api/login.php")
        .then(()=>{cb()})
        .catch(error=>{
            console.error(error);
        });
    }
    static signin(username: string, password:string, callback: (user:IUser | null, _errors:IUserErrors[] | null)=>void) {
        YII2AuthProvider.cFetch('login.php','POST',JSON.stringify({
            LoginForm:{
                password:password,
                username:username
            }
        }))
        .then(anwer=>anwer.json())
        .then((result:ILoginSignInServerAnswer)=>{
            console.log(result);
            YII2AuthProvider.proceedAnswer(username,result, callback);
        })
        .catch(error=>{
            console.error(error);
            callback(null, [
                { name:'username', message:"Пользователь не найден,", type:'server' },
                { name:'password', message:'или не верный пароль.', type:'server' }
            ]);
        })
    }
    static signup(newUser:IUser, callback: (user:IUser| null, errors:IUserErrors[] | null)=>void) {
        console.log(newUser);
        YII2AuthProvider.cFetch('newuser.php','POST',JSON.stringify({
            SignUpForm:{
                newpassword:newUser.password,
                username:newUser.username,
                firstName:newUser.firstName,
                lastName:newUser.lastName,
                email:newUser.email
            }
        }))
        .then(anwer=>anwer.json())
        .then(result=>{
            console.log(result);
            YII2AuthProvider.proceedAnswer(newUser.username, result, callback);
        })
        .catch(error=>{
            console.error(error);
            callback(null, [
                { name:'username', message:"Пользователь не найден,", type:'server' },
                { name:'password', message:'или не верный пароль.', type:'server' }
            ]);
        })

    }
    static signout(callback: VoidFunction) {
        YII2AuthProvider.cFetch('logout.php','POST')
        .then(()=>{
            console.log(`YII2AuthProvider: Is loged  out!`)
            //YII2AuthProvider.token = null;
            YII2AuthProvider._isAuthenticated = false;
            callback();
            
            //TEST !!!!!!!
            fetch(`/api/users/1`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                },
            })
            .then(anwer=>anwer.json())
            .then(result2=>{
                console.log(result2);
            }).catch(error=>{
                console.error(error);
            });
        })
        .catch(error=>{
            console.error(error);
        });
    }
    static getToken(){
        return '';
    }
    static checkStatus(callback:(user:IUser| null)=>void){

        YII2AuthProvider.cFetch('status.php','POST')
        .then(answer=>answer.json())
        .then((result:ILoginSignInServerAnswer)=>{
            if (result.status){
                if (result.id && result.username){
                    YII2AuthProvider.getUserById(result.id,result2=>{
                        if (result2){
                            callback(YII2AuthProvider.createResult(result.username as string, result2));
                        }else{
                            console.error("Сервер не вернул параметры пользователя!");            
                        }
                    });
                }else{
                    console.error("Нужна авторизация");
                    callback(null);
                }
            }else{
                console.error("Сервер не вернул строку состояния!");
                callback(null);
            }
        })
        .catch(error=>{
            console.error(error);
            callback(null);
        });    }
    static get isAuthenticated():boolean{
        return YII2AuthProvider._isAuthenticated;
    }
}

export { YII2AuthProvider };