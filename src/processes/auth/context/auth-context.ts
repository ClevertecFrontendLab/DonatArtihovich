import { createContext } from "react";

export interface IAuthContext {
    isLoginProcess: boolean;
    isRegistrationProcess: boolean;
    isChangePasswordProcess: boolean; 
    setIsLoginProcess: (b: boolean) => void;
    setIsRegistrationProcess: (b: boolean) => void;
    setIsChangePasswordProcess: (b: boolean) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null)