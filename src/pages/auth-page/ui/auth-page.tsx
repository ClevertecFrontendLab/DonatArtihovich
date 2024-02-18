import { ModalPage } from "@components/modal"
import { AuthForm } from "@components/auth-form"
import { useState } from "react"
import cls from './auth-page.module.scss'
import { classNames } from "@utils/lib"

export const AuthPage = () => {
    const [selectedMode, setSelectedMode] = useState<string>('login')

    return (
        <ModalPage className={classNames(selectedMode === 'registration' && cls.registrationModal)}>
            <AuthForm
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
            />
        </ModalPage>
    )
}