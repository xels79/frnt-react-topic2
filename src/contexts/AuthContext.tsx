/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
export interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}
const AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;

