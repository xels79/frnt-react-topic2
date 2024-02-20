/**
 * This represents some generic auth provider API, like Firebase.
 */
// import IUser from "../interfaces/IUser";
import IUser from "../interfaces/IUser";
import IUserErrors from "../interfaces/IUserErrors";
import axios from 'axios'
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
        fetch("http://a-xels.ru:8100/index.php?r=user/login",{
//            mode: "cors",
            // credentials: "include",
                // headers:{
                //     'Content-Type': 'application/json'
                // },
  //              body:JSON.stringify({})
            })
        .then(anwer=>anwer.json())
        .then(result=>{
            console.log(result);
            fetch(`http://a-xels.ru:8100/index.php?r=user/login&access-token=${result.token}`,{
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
                // if (result.status==='ok'){
                //     callback({
                //         username:result.LoadForm.username
                //     },'');
                // }else{
                    console.log(Object.keys(result.LoginForm).reduce((old,el)=>old+result.LoginForm[el],''))
                    callback(null,[
                        { name:'username', message:"Пользователь не найден,", type:'server' },
                        { name:'password', message:'или не верный пароль.', type:'server' }
                    ]);
                // }
            })
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