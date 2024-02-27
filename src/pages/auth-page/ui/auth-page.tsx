import { ModalPage } from "@components/modal"
import { AuthForm } from "@components/auth-form"
import cls from './auth-page.module.scss'
import { classNames } from "@utils/lib"

interface AuthPageProps {
    mode?: 'login' | 'registration'
}

export const AuthPage = ({ mode = 'login' }: AuthPageProps) => {

    return (
        <ModalPage className={classNames(cls.modal, mode === 'registration' && cls.registrationModal)}>
            <AuthForm
                mode={mode}
            />
        </ModalPage>
    )
}