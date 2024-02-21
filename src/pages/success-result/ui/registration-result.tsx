import { ModalPage } from "@components/modal"
import cls from './registration-result.module.scss'
import Icon from "@ant-design/icons"
import successIcon from '@assets/images/success-tick.svg'
import crossIcon from '@assets/images/no-success-cross.svg'
import { Button, Typography } from "antd"
import { useWindowSize } from "@uidotdev/usehooks"
import { useNavigate } from "react-router-dom"
import { Paths } from "@utils/const/paths"
import { useRegisterUserMutation } from "@redux/api/auth-api"
import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { userSelector } from "@redux/model/user/selectors"

interface RegistrationResultProps {
    success: boolean;
    isUncertainError?: boolean;
}

export const RegistrationResultPage = ({ success, isUncertainError = false }: RegistrationResultProps) => {
    const { width } = useWindowSize()
    const navigate = useNavigate()
    const [registerUser] = useRegisterUserMutation()
    const { email, password } = useAppSelector(userSelector)

    const handleButtonClick = () => {
        if (success) {
            navigate(Paths.AUTH)
        } else if (!isUncertainError) {
            navigate(Paths.REGISTRATION)
        } else {
            navigate(Paths.REGISTRATION)
            registerUser({ email, password } as { email: string, password: string })
        }
    }

    return (
        <ModalPage className={cls.modal}>
            <div className={cls.wrapper}>
                <Icon
                    component={() => <img src={success ? successIcon : crossIcon} />}
                    className={cls.icon}
                />
                <Typography.Title className={cls.headerTitle}>
                    {success
                        ? 'Регистрация успешна'
                        : 'Данные не сохранились'
                    }
                </Typography.Title>
                {success
                    ? <Typography.Text className={cls.headerText}>Регистрация прошла успешно. Зайдите<br />в приложение, используя свои e-mail и пароль.</Typography.Text>
                    : isUncertainError
                        ? <Typography.Text className={cls.headerText}>Что-то пошло не так и ваша регистрация<br />не завершилась. Попробуйте ещё раз.</Typography.Text>
                        : <Typography.Text className={cls.headerText}>Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по {width && width < 600 && <br />} другому e-mail.</Typography.Text>
                }
                <Button className={cls.button} onClick={handleButtonClick}>
                    {success
                        ? 'Войти'
                        : isUncertainError
                            ? 'Повторить'
                            : 'Назад к регистрации'}</Button>
            </div>
        </ModalPage >
    )
}