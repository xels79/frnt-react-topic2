
import React from "react";
import {FakeAuthProvider} from './FakeAuthProvider'
import { YII2AuthProvider } from "./YII2AuthProvider";
import AuthContext from '../contexts/AuthContext'
import IUser from "../interfaces/IUser";
import IUserErrors from "../interfaces/IUserErrors";
//import { YII2AuthProvider } from "./YII2AuthProvider";
export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [user, setUser] = React.useState<IUser | null>(null);

    const isLoggetIn = ()=>FakeAuthProvider.isAuthenticated;
    const signup = (newUser:IUser, callback: (isLoggedIn:boolean, errors:IUserErrors[] | null)=>void)=>{
        return FakeAuthProvider.signup(newUser,(user, _errors:IUserErrors[] | null)=>{
            setUser(user);
            callback(user!==null,_errors);
        });
    };
    const signin = (username: string, password:string, callback: (isLoggedIn:boolean, errors:IUserErrors[] | null)=>void) => {
        return YII2AuthProvider.signin(username, password, (user:IUser | null, _errors:IUserErrors[] | null) => {
            setUser(user);
            callback(user!==null,_errors);
        });
    };
    const userCount = ()=>FakeAuthProvider.usersCount;
    const signout = (callback: VoidFunction) => {
        return FakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    const value  = { user, signup, signin, signout, isLoggetIn, userCount } ;

    return <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>;
}  