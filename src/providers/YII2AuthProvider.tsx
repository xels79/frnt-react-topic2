/**
 * This represents some generic auth provider API, like Firebase.
 */
import IUser from "../interfaces/IUser";
class YII2AuthProvider{
    static isAuthenticated = false;
    static signin(username:string, password:string, callback: (user:IUser| null, message:string)=>void) {
        fetch("http://a-xels.ru/micro/index.php?r=main/login",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                LoginForm:{
                    username:username,
                    password:password
                }
            })
        })
        .then(anwer=>anwer.json())
        .then(result=>{
            if (result.status==='ok'){
                callback({
                    username:result.LoadForm.username
                },'');
            }else{
                console.log(Object.keys(result.LoginForm).reduce((old,el)=>old+result.LoginForm[el],''))
                callback(null,Object.keys(result.LoginForm).reduce((old,el)=>!old?old:(', '+old)+result.LoginForm[el],''));
            }
        })
        .catch(error=>{
            console.error(error);
            callback(null, 'Network error.');
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