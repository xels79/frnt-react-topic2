
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import {FakeAuthProvider} from '../components/FakeAuthProvider/FakeAuthProvider'
import AuthContext from '../contexts/AuthContext'
import IUser from "../interfaces/IUser";
export default function AuthProvider({ children }: { children: React.ReactNode }){
    const [user, setUser] = React.useState<IUser | null>(null);

    const isLoggetIn = ()=>FakeAuthProvider.isAuthenticated;
    const signin = (username: string, password:string, callback: (isLoggedIn:boolean)=>void) => {
        return FakeAuthProvider.signin(username, password, (user:IUser | null) => {
            setUser(user);
            callback(user!==null);
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