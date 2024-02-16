/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from "react";
import IAuthContextType from "../interfaces/IAuthContextType";
//import IUser from "../interfaces/IUser";
// export interface AuthContextType {
//     user: IUser;
//     signin: (username: string, password:string, callback: (isLoggedIn:boolean)=>void) => void;
//     signout: (callback: VoidFunction) => void;
// }
const AuthContext = React.createContext<IAuthContextType>(null!);

export default AuthContext;

