import { useState } from "react"
import { AuthContext } from ".."

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoginProcess, setIsLoginProcess] = useState<boolean>(false)
    const [isRegistrationProcess, setIsRegistrationProcess] = useState<boolean>(false)
    const [isChangePasswordProcess, setIsChangePasswordProcess] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{
            isLoginProcess,
            isRegistrationProcess,
            isChangePasswordProcess,
            setIsLoginProcess,
            setIsRegistrationProcess,
            setIsChangePasswordProcess
        }}>
            {children}
        </AuthContext.Provider>
    )
}