/**
 * FakeAuthProvider represents some generic auth provider API, like Firebase.
 */
import IUser from "../interfaces/IUser";
import IUserErrors from "../interfaces/IUserErrors";
const emulateSigninDelay = 1000;
const emulateSignupDelay = 1300;
class FakeAuthProvider{
    private static userList:IUser[] = [];
    static get usersCount():number{
        return FakeAuthProvider.userList.length;
    }
    static isAuthenticated = false;
    static signup(newUser:IUser, callback: (user:IUser| null, errors:IUserErrors[] | null)=>void) {
        //Имитируем запрос на сервер
        console.log(`FakeAuthProvider: try to signup "${newUser.username}"=>"${newUser.password}".`)
        console.log(`FakeAuthProvider: users count "${FakeAuthProvider.userList.length}"`);
        console.log(`FakeAuthProvider: emulate server request delay - ${emulateSignupDelay}ms`);
        setTimeout(()=>{
            const uExists:IUser|undefined = FakeAuthProvider.userList.find(userItem=>userItem.username === newUser.username);
            if (uExists){
                callback(null, [{ name:'username', message:"Имя пользователя занято.", type:'server' }]);
                return;
            }
            const eExists:IUser|undefined = FakeAuthProvider.userList.find(userItem=>userItem.email === newUser.email);
            if (eExists){
                callback(null, [{  name:'email', message:"Email адрес уже занят.", type:'server' }]);
                return;
            }
            if (!newUser.password || newUser.password.length<6){
                callback(null, [{ name:'password', message:"Пароль не может быть меньше 8-и символов.", type:'server' }]);
                return;
            }
            if (!newUser.username || newUser.username.trim().length<1){
                callback(null, [{ name:'username', message:"Имя пользователя не может быть пустым.", type:'server'}]);
                return;
            }else{
                newUser.username = newUser.username.trim();
            }
            FakeAuthProvider.userList.push(newUser);
            FakeAuthProvider.isAuthenticated = true;
            console.log(`FakeAuthProvider: "${newUser.username}"=>"${newUser.password}" - registered and logged in.`)
            callback(FakeAuthProvider.userList[FakeAuthProvider.userList.length-1], null);
            
        }, emulateSignupDelay);
    }
    static signin(username:string, password:string|undefined, callback: (user:IUser| null, errors:IUserErrors[] | null)=>void) {
        console.log(`FakeAuthProvider: try loggin "${username}"=>"${password}"`);
        console.log(`FakeAuthProvider: users count "${FakeAuthProvider.userList.length}"`);
        console.log(`FakeAuthProvider: emulate server request delay - ${emulateSigninDelay}ms`);
        setTimeout(()=>{
            const foundedUser:IUser | undefined = FakeAuthProvider.userList.find(userItem=>userItem.username === username);
            if (foundedUser){
                if (foundedUser.password === password){
                    console.log(`FakeAuthProvider: "${username}"=>"${password}" is logged in.`)
                    callback(foundedUser, null);
                }else{
                    console.log(`FakeAuthProvider: wrong password "${password}"`);
                    console.log(`FakeAuthProvider: users count "${FakeAuthProvider.userList.length}"`);
                    callback(null, [
                        { name:'username', message:"Пользователь не найден,", type:'server' },
                        { name:'password', message:'или не верный пароль.', type:'server' }
                    ]);    
                }
            }else{
                console.log(`FakeAuthProvider: wrong username "${username}"`);
                callback(null, [
                    { name:'username', message:"Пользователь не найден,", type:'server' },
                    { name:'password', message:'или не верный пароль.', type:'server' }
                ]);
            }
        }, emulateSigninDelay);
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