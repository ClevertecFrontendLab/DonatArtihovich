import { ModalPage } from "@components/modal"
import cls from './auth-result.module.scss'
import Icon from "@ant-design/icons"
import successIcon from '@assets/images/success-tick.svg'
import crossIcon from '@assets/images/no-success-cross.svg'
import loginErrorIcon from '@assets/images/login-error.svg'
import { Button, Typography } from "antd"
import { useWindowSize } from "@uidotdev/usehooks"
import { useNavigate } from "react-router-dom"
import { Paths } from "@utils/const/paths"
import { useRegisterUserMutation } from "@redux/api/auth-api"
import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { userSelector } from "@redux/model/user/selectors"
import { classNames } from "@utils/lib"
import { ModalErrors } from "@utils/const/modal-errors"

interface RegistrationResultProps {
    mode: ModalErrors;
}

export const ModalResultPage = ({ mode }: RegistrationResultProps) => {
    const { width } = useWindowSize()
    const navigate = useNavigate()
    const [registerUser] = useRegisterUserMutation()
    const { email, password } = useAppSelector(userSelector)

    const handleButtonClick = () => {
        if (mode === ModalErrors.LoginError || mode === ModalErrors.RegistrationSuccess) {
            navigate(Paths.AUTH)
        } else if (mode === ModalErrors.RegistrationError) {
            navigate(Paths.REGISTRATION)
        } else {
            navigate(Paths.REGISTRATION)
            registerUser({ email, password } as { email: string, password: string })
        }
    }

    return (
        <ModalPage className={classNames(cls.modal, mode === ModalErrors.LoginError && cls.login)}>
            <div className={cls.wrapper}>
                <Icon
                    component={() => <img src={mode === ModalErrors.LoginError
                        ? loginErrorIcon
                        : mode === ModalErrors.RegistrationSuccess
                            ? successIcon
                            : crossIcon}
                    />}
                    className={cls.icon}
                />
                <Typography.Title className={cls.headerTitle}>
                    {mode === ModalErrors.LoginError
                        ? 'Вход не выполнен'
                        : mode === ModalErrors.RegistrationSuccess
                            ? 'Регистрация успешна'
                            : 'Данные не сохранились'
                    }
                </Typography.Title>
                {mode === ModalErrors.LoginError
                    ? <Typography.Text className={cls.headerText}>Что-то пошло не так. Попробуйте еще раз</Typography.Text>
                    : mode === ModalErrors.RegistrationSuccess
                        ? <Typography.Text className={cls.headerText}>Регистрация прошла успешно. Зайдите<br />в приложение, используя свои e-mail и пароль.</Typography.Text>
                        : mode !== ModalErrors.RegistrationUserExistError
                            ? <Typography.Text className={cls.headerText}>Что-то пошло не так и ваша регистрация<br />не завершилась. Попробуйте ещё раз.</Typography.Text>
                            : <Typography.Text className={cls.headerText}>Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по {width && width < 600 && <br />} другому e-mail.</Typography.Text>
                }
                <Button className={cls.button} onClick={handleButtonClick}>
                    {mode === ModalErrors.LoginError
                        ? 'Повторить'
                        : mode === ModalErrors.RegistrationSuccess
                            ? 'Войти'
                            : mode !== ModalErrors.RegistrationUserExistError
                                ? 'Повторить'
                                : 'Назад к регистрации'}
                </Button>
            </div>
        </ModalPage >
    )
}