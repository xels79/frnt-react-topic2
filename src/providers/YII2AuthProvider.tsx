/**
 * This represents some generic auth provider API, like Firebase.
 */
// import IUser from "../interfaces/IUser";
import IUser from "../interfaces/IUser";
import IUserErrors, { TErrorNames } from "../interfaces/IUserErrors";
// import axios from 'axios'
class YII2AuthProvider{
    static isAuthenticated = false;
    static signin(username: string, password:string, callback: (user:IUser | null, _errors:IUserErrors[] | null)=>void) {
        const f = new FormData();
        f.append("LoginForm[username]",username);
        f.append("LodinForm[password]",password);
        // axios({
        //     method: 'post',
        //     //mode: 'cors',
        //     url: 'http://a-xels.ru:8100/index.php?r=main/login',
        //     headers:{
        //         'Content-Type': 'application/json',
                
        //     },
        //     data: {
        //         firstName: 'Fred',
        //         lastName: 'Flintstone'
        //     }          
        // })
        // .then(function (response) {
        //     console.log(response.data)
        // });;
        fetch("http://a-xels.ru:8100/login.php",{
            method:"POST",
            mode: "cors",
            // credentials: "include",
            headers:{
                'Content-Type': 'application/json'
            },
                body:JSON.stringify({
                    LoginForm:{
                        password:password,
                        username:username
                    }
                })
            })
        .then(anwer=>anwer.json())
        .then(result=>{
            console.log(result);
            if (result.status === 'logged'){
                fetch(`http://a-xels.ru:8100/info.php`,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'a-token':result?.token
                    },
                })
                .then(anwer=>anwer.json())
                .then(result2=>{
                    console.log(result2);
                });
            }else if (result.status === 'error'){
                if (result.LoginForm){
                    const errKeys=Object.keys(result.LoginForm);
                    const _errors:IUserErrors[] = errKeys.map((eKey):IUserErrors=>{
                        return {
                            type:'server',
                            name:eKey as TErrorNames,
                            message:typeof(result.LoginForm[eKey] === 'string')?result.LoginForm[eKey]:result.LoginForm[eKey].join(' ')
                        }
                    });
                    callback(null, _errors);
                }else{
                    console.warn('Не известная ошибка!',result);
                }
            }else{
                console.warn('Не известная ошибка!',result);
            }
        })
        .catch(error=>{
            console.error(error);
            callback(null, [
                { name:'username', message:"Пользователь не найден,", type:'server' },
                { name:'password', message:'или не верный пароль.', type:'server' }
            ]);
        })
        // setTimeout(()=>{
        //     FakeAuthProvider.isAuthenticated = true;
        //     console.log(`FakeAuthProvider: try loggin "${username}"=>"${password}"`)
        //     if (password!='12345' || username!="test"){
        //         if (username!="test"){
        //             console.log(`FakeAuthProvider: wrong username "${username}"=>"${password}"`)                
        //             console.log('FakeAuthProvider: allow username - "test"');
        //         }
        //         if (password!='12345'){
        //             console.log(`FakeAuthProvider: wrong password "${username}"=>"${password}"`)                
        //             console.log('FakeAuthProvider: allow - "12345"');
        //         }
        //         callback(null);
        //     }else{
        //         console.log(`FakeAuthProvider: register loggin in "${username}"=>"${password}"`)
        //         callback({
        //             username:username
        //         });
        //     }
        // }, 1000); // fake async
    }
    static signout(callback: VoidFunction) {
        setTimeout(()=>{
            console.log(`FakeAuthProvider:Logginout!`)
            YII2AuthProvider.isAuthenticated = false;
            callback();
        }, 400);
    }
}

export { YII2AuthProvider };