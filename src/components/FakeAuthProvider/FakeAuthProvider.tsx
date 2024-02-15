/**
 * This represents some generic auth provider API, like Firebase.
 */
import IUser from "../../interfaces/IUser";
class FakeAuthProvider{
    static isAuthenticated = false;
    static signin(username:string, password:string, callback: (user:IUser| null)=>void) {
        setTimeout(()=>{
            FakeAuthProvider.isAuthenticated = true;
            console.log(`FakeAuthProvider: try loggin "${username}"=>"${password}"`)
            if (password!='12345' || username!="test"){
                if (username!="test"){
                    console.log(`FakeAuthProvider: wrong username "${username}"=>"${password}"`)                
                    console.log('FakeAuthProvider: allow username - "test"');
                }
                if (password!='12345'){
                    console.log(`FakeAuthProvider: wrong password "${username}"=>"${password}"`)                
                    console.log('FakeAuthProvider: allow - "12345"');
                }
                callback(null);
            }else{
                console.log(`FakeAuthProvider: register loggin in "${username}"=>"${password}"`)
                callback({
                    username:username
                });
            }
        }, 1000); // fake async
    }
    static signout(callback: VoidFunction) {
        setTimeout(()=>{
            console.log(`FakeAuthProvider:Logginout!`)
            FakeAuthProvider.isAuthenticated = false;
            callback();
        }, 400);
    }
}

export { FakeAuthProvider };