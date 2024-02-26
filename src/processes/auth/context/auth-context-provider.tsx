import { AuthContext, IAuthContext } from ".."

const initialValue: IAuthContext = {
    isLoginProcess: false,
    isRegistrationProcess: false,
    isChangePasswordProcess: false,
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext.Provider value={initialValue}>
            {children}
        </AuthContext.Provider>
    )
}