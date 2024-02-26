import { ModalPage } from "@components/modal"
import cls from './result-modal.module.scss'
import Icon from "@ant-design/icons"
import successIcon from '@assets/images/success-tick.svg'
import crossIcon from '@assets/images/cross.svg'
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
        [ModalErrors.CheckEmailError]: <Typography.Text className={cls.headerText}>Произошла ошибка, попробуйте {width && width <= 600 && <br />}отправить форму ещё раз.</Typography.Text>,
        [ModalErrors.ChangePasswordSuccess]: <Typography.Text className={cls.headerText}>Теперь можно войти в аккаунт, используя<br />свой логин и новый пароль</Typography.Text>,
        [ModalErrors.ChangePasswordError]: <Typography.Text className={cls.headerText}>Что-то пошло не так. Попробуйте ещё раз</Typography.Text>
    } as Record<ModalErrors, React.ReactNode>

    const headerTitle = {
        [ModalErrors.LoginError]: <Typography.Title className={cls.headerTitle}>Вход не выполнен</Typography.Title>,
        [ModalErrors.RegistrationSuccess]: <Typography.Title className={cls.headerTitle}>Регистрация успешна</Typography.Title>,
        [ModalErrors.RegistrationUserExistError]: <Typography.Title className={cls.headerTitle}>Данные не сохранились</Typography.Title>,
        [ModalErrors.RegistrationError]: <Typography.Title className={cls.headerTitle}>Данные не сохранились</Typography.Title>,
        [ModalErrors.CheckEmailNoExistError]: <Typography.Title className={cls.headerTitle}>Такой e-mail не зарегистрирован</Typography.Title>,
        [ModalErrors.CheckEmailError]: <Typography.Title className={cls.headerTitle}>Что-то пошло не так</Typography.Title>,
        [ModalErrors.ChangePasswordSuccess]: <Typography.Title className={cls.headerTitle}>Пароль успешно{width && width <= 600 && <br />} изменен</Typography.Title>,
        [ModalErrors.ChangePasswordError]: <Typography.Title className={cls.headerTitle}>Данные не сохранились</Typography.Title>
    } as Record<ModalErrors, React.ReactNode>

    const buttonText = {
        [ModalErrors.LoginError]: 'Повторить',
        [ModalErrors.RegistrationSuccess]: 'Войти',
        [ModalErrors.RegistrationUserExistError]: 'Повторить',
        [ModalErrors.RegistrationError]: 'Назад к регистрации',
        [ModalErrors.CheckEmailNoExistError]: 'Попробовать снова',
        [ModalErrors.CheckEmailError]: 'Назад',
        [ModalErrors.ChangePasswordSuccess]: 'Вход',
        [ModalErrors.ChangePasswordError]: 'Повторить'
    } as Record<ModalErrors, string>

    const icons = {
        [ModalErrors.LoginError]: loginErrorIcon,
        [ModalErrors.RegistrationError]: crossIcon,
        [ModalErrors.RegistrationSuccess]: successIcon,
        [ModalErrors.RegistrationUserExistError]: crossIcon,
        [ModalErrors.CheckEmailNoExistError]: crossIcon,
        [ModalErrors.CheckEmailError]: checkEmailError,
        [ModalErrors.ChangePasswordSuccess]: successIcon,
        [ModalErrors.ChangePasswordError]: crossIcon
    } as Record<ModalErrors, string>

    const handleButtonClick = () => {
        switch (mode) {
            case ModalErrors.LoginError:
            case ModalErrors.RegistrationSuccess:
            case ModalErrors.ChangePasswordSuccess:
                navigate(Paths.AUTH)
                break;
            case ModalErrors.RegistrationError:
                navigate(Paths.REGISTRATION)
                break;
            case ModalErrors.RegistrationUserExistError:
                navigate(Paths.REGISTRATION)
                registerUser({ email, password } as { email: string, password: string })
                break;
            case ModalErrors.CheckEmailNoExistError:
                navigate(Paths.AUTH)
                break;
            case ModalErrors.CheckEmailError:
                navigate(Paths.AUTH)
                break;
            case ModalErrors.ChangePasswordError:
                navigate(Paths.CHANGE_PASSWORD)
                break;
        }
    }

    return (
        <ModalPage className={classNames(
            cls.modal,
            mode === ModalErrors.LoginError && cls.login,
            mode === ModalErrors.CheckEmailError && cls.checkEmailError,
            mode === ModalErrors.ChangePasswordSuccess && cls.changePasswordSuccess
        )}>
            <div className={cls.wrapper}>
                <Icon component={() => <img src={icons[mode]} />} className={cls.icon} />
                {headerTitle[mode]}
                {headerText[mode]}
                <Button className={cls.button} onClick={handleButtonClick}>{buttonText[mode]}</Button>
            </div>
        </ModalPage>
    )
}