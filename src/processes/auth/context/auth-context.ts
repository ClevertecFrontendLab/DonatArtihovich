import { createContext } from "react";

export interface IAuthContext {
    isLoginProcess: boolean;
    isRegistrationProcess: boolean;
    isChangePasswordProcess: boolean; 
} 

export const AuthContext = createContext<IAuthContext | null>(null)