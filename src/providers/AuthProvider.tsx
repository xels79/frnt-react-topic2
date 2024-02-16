
import React from "react";
import {FakeAuthProvider} from './FakeAuthProvider'
import AuthContext from '../contexts/AuthContext'
import IUser from "../interfaces/IUser";
//import { YII2AuthProvider } from "./YII2AuthProvider";
export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [user, setUser] = React.useState<IUser | null>(null);

    const isLoggetIn = ()=>FakeAuthProvider.isAuthenticated;
    const signin = (username: string, password:string, callback: (isLoggedIn:boolean, message?:string)=>void) => {
        return FakeAuthProvider.signin(username, password, (user:IUser | null, _message?:string) => {
            setUser(user);
            callback(user!==null,_message);
        });
    };

    const signout = (callback: VoidFunction) => {
        return FakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    const value  = { user, signin, signout, isLoggetIn } ;

    return <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>;
}  