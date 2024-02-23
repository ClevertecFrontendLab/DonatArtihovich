import { ModalPage } from "@components/modal"
import cls from './result-modal.module.scss'
import Icon from "@ant-design/icons"
import successIcon from '@assets/images/success-tick.svg'
import crossIcon from '@assets/images/no-success-cross.svg'
import loginErrorIcon from '@assets/images/login-error.svg'
import checkEmailError from '@assets/images/check-email-error.svg'
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

export const ResultModalPage = ({ mode }: RegistrationResultProps) => {
    const { width } = useWindowSize()
    const navigate = useNavigate()
    const [registerUser] = useRegisterUserMutation()
    const { email, password } = useAppSelector(userSelector)

    const headerText = {
        [ModalErrors.LoginError]: <Typography.Text className={cls.headerText}>Что-то пошло не так. Попробуйте еще раз</Typography.Text>,
        [ModalErrors.RegistrationSuccess]: <Typography.Text className={cls.headerText}>Регистрация прошла успешно. Зайдите<br />в приложение, используя свои e-mail и пароль.</Typography.Text>,
        [ModalErrors.RegistrationError]: <Typography.Text className={cls.headerText}>Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по {width && width < 600 && <br />} другому e-mail.</Typography.Text>,
        [ModalErrors.RegistrationUserExistError]: <Typography.Text className={cls.headerText}>Что-то пошло не так и ваша регистрация<br />не завершилась. Попробуйте ещё раз.</Typography.Text>,
        [ModalErrors.CheckEmailNoExistError]: <Typography.Text className={cls.headerText}>Мы не нашли в базе вашего e-mail.{width && width <= 600 && <br />} Попробуйте{width && width > 600 && <br />} войти с другим e-mail.</Typography.Text>,
        [ModalErrors.CheckEmailError]: <Typography.Text className={cls.headerText}>Произошла ошибка, попробуйте {width && width <= 600 && <br />}отправить форму ещё раз.</Typography.Text>
    } as Record<ModalErrors, React.ReactNode>

    const headerTitle = {
        [ModalErrors.LoginError]: 'Вход не выполнен',
        [ModalErrors.RegistrationSuccess]: 'Регистрация успешна',
        [ModalErrors.RegistrationUserExistError]: 'Данные не сохранились',
        [ModalErrors.RegistrationError]: 'Данные не сохранились',
        [ModalErrors.CheckEmailNoExistError]: 'Такой e-mail не зарегистрирован',
        [ModalErrors.CheckEmailError]: 'Что-то пошло не так'
    } as Record<ModalErrors, string>

    const buttonText = {
        [ModalErrors.LoginError]: 'Повторить',
        [ModalErrors.RegistrationSuccess]: 'Войти',
        [ModalErrors.RegistrationUserExistError]: 'Повторить',
        [ModalErrors.RegistrationError]: 'Назад к регистрации',
        [ModalErrors.CheckEmailNoExistError]: 'Попробовать снова',
        [ModalErrors.CheckEmailError]: 'Назад'
    } as Record<ModalErrors, string>

    const icons = {
        [ModalErrors.LoginError]: loginErrorIcon,
        [ModalErrors.RegistrationError]: crossIcon,
        [ModalErrors.RegistrationSuccess]: successIcon,
        [ModalErrors.RegistrationUserExistError]: crossIcon,
        [ModalErrors.CheckEmailNoExistError]: crossIcon,
        [ModalErrors.CheckEmailError]: checkEmailError
    } as Record<ModalErrors, string>

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
                <Icon component={() => <img src={icons[mode]} />} className={cls.icon} />
                <Typography.Title className={cls.headerTitle}>{headerTitle[mode]}</Typography.Title>
                {headerText[mode]}
                <Button className={cls.button} onClick={handleButtonClick}>{buttonText[mode]}</Button>
            </div>
        </ModalPage>
    )
}