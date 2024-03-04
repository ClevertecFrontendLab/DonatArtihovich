import { useState } from "react"
import { AuthContext } from ".."

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoginProcess, setIsLoginProcess] = useState<boolean>(false)
    const [isRegistrationProcess, setIsRegistrationProcess] = useState<boolean>(false)
    const [isChangePasswordProcess, setIsChangePasswordProcess] = useState<boolean>(false)
    const [isRemembered, setIsRemembered] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{
            isLoginProcess,
            isRegistrationProcess,
            isChangePasswordProcess,
            isRemembered,
            setIsLoginProcess,
            setIsRegistrationProcess,
            setIsChangePasswordProcess,
            setIsRemembered
        }}>
            {children}
        </AuthContext.Provider>
    )
}