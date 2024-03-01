import { ModalPage } from "@components/modal"
import cls from './result-modal.module.scss'
import { useNavigate } from "react-router-dom"
import { Paths } from "@utils/const/paths"
import { classNames } from "@utils/lib"
import { ModalErrors } from "@utils/const/modal-errors"
import { useEffect } from "react"
import { useRequiredContext } from "@hooks/typed-use-context-hook"
import { AuthContext } from "@processes/auth"
import { ResultModal } from "@components/result-modal"

type RegistrationResultProps = {
    mode: ModalErrors;
}

export const ResultModalPage = ({ mode }: RegistrationResultProps) => {
    const navigate = useNavigate()
    const {
        isLoginProcess,
        isRegistrationProcess,
        isChangePasswordProcess,
        setIsLoginProcess,
        setIsRegistrationProcess,
        setIsChangePasswordProcess
    } = useRequiredContext(AuthContext)

    useEffect(() => {
        switch (mode) {
            case ModalErrors.LoginError:
                !isLoginProcess && navigate(Paths.MAIN)
                setIsLoginProcess(false)
                break;
            case ModalErrors.RegistrationSuccess:
            case ModalErrors.RegistrationError:
            case ModalErrors.RegistrationUserExistError:
                !isRegistrationProcess && navigate(Paths.MAIN)
                setIsRegistrationProcess(false)
                break;
            case ModalErrors.CheckEmailNoExistError:
            case ModalErrors.CheckEmailError:
            case ModalErrors.ChangePasswordError:
            case ModalErrors.ChangePasswordSuccess:
                !isChangePasswordProcess && navigate(Paths.MAIN)
                setIsChangePasswordProcess(false)
        }
    }, [navigate])

    return (
        <ModalPage className={classNames(
            cls.modal,
            mode === ModalErrors.LoginError && cls.login,
            mode === ModalErrors.CheckEmailError && cls.checkEmailError,
            mode === ModalErrors.ChangePasswordSuccess && cls.changePasswordSuccess
        )}>
            <ResultModal mode={mode} />
        </ModalPage>
    )
}