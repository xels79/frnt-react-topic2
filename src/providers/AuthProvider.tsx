
import React from "react";
// import {FakeAuthProvider} from './FakeAuthProvider'
 import { YII2AuthProvider } from "./YII2AuthProvider";
import AuthContext from '../contexts/AuthContext'
import IUser from "../interfaces/IUser";
import IUserErrors from "../interfaces/IUserErrors";
export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [user, setUser] = React.useState<IUser | null>(null);

    const signup = (newUser:IUser, callback: (isLoggedIn:boolean, errors:IUserErrors[] | null)=>void)=>{
        return YII2AuthProvider.signup(newUser,(user, _errors:IUserErrors[] | null)=>{
            setUser(user);
            callback(user!==null,_errors);
        });
    };
    const signin = (username: string, password:string, callback: (isLoggedIn:boolean, errors:IUserErrors[] | null)=>void) => {
        return YII2AuthProvider.signin(username, password, (user:IUser | null, _errors:IUserErrors[] | null) => {
            setUser(user);
            if (_errors) console.log(_errors);
            callback(user!==null,_errors);
        });
    };
    const userCount = ()=>YII2AuthProvider.usersCount;
    const signout = (callback: VoidFunction) => {
        return YII2AuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };
    const checkStatus = (callback:(user:IUser| null)=>void)=>{
        if (user){
            setUser(user);
            callback(user);
        }else{
            YII2AuthProvider.checkStatus((_user:IUser| null)=>{
                setUser(_user);
                callback(_user);
            });
        }
    }
    const isLoggetIn = ()=>{
        console.log('isLoggetIn',user);
        if (user!==null){
            return user;
        }else{
            checkStatus((user)=>{
                setUser(user);
            });
            return false;
        }
    };
    //()=>YII2AuthProvider.isAuthenticated;

    const value  = { user, signup, signin, signout, isLoggetIn, userCount, checkStatus } ;

    return <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>;
}  