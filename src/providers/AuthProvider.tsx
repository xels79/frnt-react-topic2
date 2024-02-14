
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import {FakeAuthProvider} from '../components/FakeAuthProvider/FakeAuthProvider'
import AuthContext from '../contexts/AuthContext'
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>(null);

    const signin = (newUser: string, callback: VoidFunction) => {
        return FakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };

    const signout = (callback: VoidFunction) => {
        return FakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    const value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}  