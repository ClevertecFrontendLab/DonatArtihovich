import { ModalPage } from "@components/modal"
import { AuthForm } from "@components/auth-form"
import { useState } from "react"
import cls from './auth-page.module.scss'
import { classNames } from "@utils/lib"

interface AuthPageProps {
    defaultMode?: 'login' | 'registration'
}

export const AuthPage = ({ defaultMode = 'login' }: AuthPageProps) => {
    const [selectedMode, setSelectedMode] = useState<string>(defaultMode)

    return (
        <ModalPage className={classNames(selectedMode === 'registration' && cls.registrationModal)}>
            <AuthForm
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
            />
        </ModalPage>
    )
}