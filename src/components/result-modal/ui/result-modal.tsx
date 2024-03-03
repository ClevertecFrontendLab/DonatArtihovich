import Icon from "@ant-design/icons/lib/components/Icon"
import cls from './result-modal.module.scss'
import { ModalErrors } from "@utils/const/modal-errors"
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { useWindowSize } from "@uidotdev/usehooks";
import { Paths } from "@utils/const/paths";
import { history } from "@redux/configure-store";
import successIcon from '@assets/images/success-tick.svg'
import crossIcon from '@assets/images/cross.svg'
import loginErrorIcon from '@assets/images/login-error.svg'
import anyError from '@assets/images/check-email-error.svg'
import { classNames } from "@utils/lib";
import { useRequiredContext } from "@hooks/typed-use-context-hook";
import { ModalContext } from "@processes/modal";
import ModalModes from "@utils/const/modal-modes";

type ResultModalProps = {
    mode: ModalErrors | ModalModes;
    className?: string;
    buttons?: React.ReactNode;
}

export const ResultModal = ({ mode, className, buttons }: ResultModalProps) => {
    const navigate = useNavigate()
    const { width } = useWindowSize()
    const { setMode } = useRequiredContext(ModalContext)

    const headerText = {
        [ModalErrors.LoginError]: <Typography.Text className={cls.headerText}>Что-то пошло не так. Попробуйте еще раз</Typography.Text>,
        [ModalErrors.RegistrationSuccess]: <Typography.Text className={cls.headerText}>Регистрация прошла успешно. Зайдите<br />в приложение, используя свои e-mail и пароль.</Typography.Text>,
        [ModalErrors.RegistrationError]: <Typography.Text className={cls.headerText}>Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по {width && width < 600 && <br />} другому e-mail.</Typography.Text>,
        [ModalErrors.RegistrationUserExistError]: <Typography.Text className={cls.headerText}>Что-то пошло не так и ваша регистрация<br />не завершилась. Попробуйте ещё раз.</Typography.Text>,
        [ModalErrors.CheckEmailNoExistError]: <Typography.Text className={cls.headerText}>Мы не нашли в базе вашего e-mail.{width && width <= 600 && <br />} Попробуйте{width && width > 600 && <br />} войти с другим e-mail.</Typography.Text>,
        [ModalErrors.CheckEmailError]: <Typography.Text className={cls.headerText}>Произошла ошибка, попробуйте {width && width <= 600 && <br />}отправить форму ещё раз.</Typography.Text>,
        [ModalErrors.ChangePasswordSuccess]: <Typography.Text className={cls.headerText}>Теперь можно войти в аккаунт, используя<br />свой логин и новый пароль</Typography.Text>,
        [ModalErrors.ChangePasswordError]: <Typography.Text className={cls.headerText}>Что-то пошло не так. Попробуйте ещё раз</Typography.Text>,
        [ModalModes.GetFeedbacksError]: <Typography.Text className={cls.headerText}>Произошла ошибка,{width && width <= 700 && <br />} попробуйте ещё раз.</Typography.Text>,
        [ModalModes.CreateFeedbackError]: <Typography.Text className={cls.headerText}>Что-то пошло не так. Попробуйте ещё раз.</Typography.Text>
    } as Record<ModalErrors | ModalModes, React.ReactNode>

    const headerTitle = {
        [ModalErrors.LoginError]: <Typography.Title className={cls.headerTitle}>Вход не выполнен</Typography.Title>,
        [ModalErrors.RegistrationSuccess]: <Typography.Title className={cls.headerTitle}>Регистрация успешна</Typography.Title>,
        [ModalErrors.RegistrationUserExistError]: <Typography.Title className={cls.headerTitle}>Данные не сохранились</Typography.Title>,
        [ModalErrors.RegistrationError]: <Typography.Title className={cls.headerTitle}>Данные не сохранились</Typography.Title>,
        [ModalErrors.CheckEmailNoExistError]: <Typography.Title className={cls.headerTitle}>Такой e-mail не зарегистрирован</Typography.Title>,
        [ModalErrors.CheckEmailError]: <Typography.Title className={cls.headerTitle}>Что-то пошло не так</Typography.Title>,
        [ModalErrors.ChangePasswordSuccess]: <Typography.Title className={cls.headerTitle}>Пароль успешно{width && width <= 600 && <br />} изменен</Typography.Title>,
        [ModalErrors.ChangePasswordError]: <Typography.Title className={cls.headerTitle}>Данные не сохранились</Typography.Title>,
        [ModalModes.GetFeedbacksError]: <Typography.Title className={cls.headerTitle}>Что-то пошло не так</Typography.Title>,
        [ModalModes.CreateFeedbackSuccess]: <Typography.Title className={cls.headerTitle}>Отзыв успешно опубликован</Typography.Title>,
        [ModalModes.CreateFeedbackError]: <Typography.Title className={cls.headerTitle}>Данные не сохранились</Typography.Title>
    } as Record<ModalErrors | ModalModes, React.ReactNode>

    const buttonText = {
        [ModalErrors.LoginError]: 'Повторить',
        [ModalErrors.RegistrationSuccess]: 'Войти',
        [ModalErrors.RegistrationUserExistError]: 'Назад к регистрации',
        [ModalErrors.RegistrationError]: 'Повторить',
        [ModalErrors.CheckEmailNoExistError]: 'Попробовать снова',
        [ModalErrors.CheckEmailError]: 'Назад',
        [ModalErrors.ChangePasswordSuccess]: 'Вход',
        [ModalErrors.ChangePasswordError]: 'Повторить',
        [ModalModes.GetFeedbacksError]: 'Назад',
        [ModalModes.CreateFeedbackSuccess]: 'Отлично'
    } as Record<ModalErrors | ModalModes, string>

    const icons = {
        [ModalErrors.LoginError]: loginErrorIcon,
        [ModalErrors.RegistrationError]: crossIcon,
        [ModalErrors.RegistrationSuccess]: successIcon,
        [ModalErrors.RegistrationUserExistError]: crossIcon,
        [ModalErrors.CheckEmailNoExistError]: crossIcon,
        [ModalErrors.CheckEmailError]: anyError,
        [ModalErrors.ChangePasswordSuccess]: successIcon,
        [ModalErrors.ChangePasswordError]: crossIcon,
        [ModalModes.GetFeedbacksError]: anyError,
        [ModalModes.CreateFeedbackSuccess]: successIcon,
        [ModalModes.CreateFeedbackError]: crossIcon
    } as Record<ModalErrors | ModalModes, string>

    const testId = {
        [ModalErrors.LoginError]: 'login-retry-button',
        [ModalErrors.RegistrationError]: 'registration-retry-button',
        [ModalErrors.RegistrationSuccess]: 'registration-enter-button',
        [ModalErrors.RegistrationUserExistError]: 'registration-back-button',
        [ModalErrors.CheckEmailNoExistError]: 'check-retry-button',
        [ModalErrors.CheckEmailError]: 'check-back-button',
        [ModalErrors.ChangePasswordSuccess]: 'change-entry-button',
        [ModalErrors.ChangePasswordError]: 'change-retry-button'
    } as Record<ModalErrors | ModalModes, string>

    const handleButtonClick = () => {
        switch (mode) {
            case ModalErrors.LoginError:
            case ModalErrors.RegistrationSuccess:
            case ModalErrors.ChangePasswordSuccess:
                navigate(Paths.AUTH)
                break;
            case ModalErrors.RegistrationError:
                history.push({ pathname: Paths.REGISTRATION }, { from: Paths.REGISTRATION_USER_EXIST_ERROR })
                break;
            case ModalErrors.RegistrationUserExistError:
                navigate(Paths.REGISTRATION)
                break;
            case ModalErrors.CheckEmailNoExistError:
                navigate(Paths.AUTH)
                break;
            case ModalErrors.CheckEmailError:
                history.push({ pathname: Paths.AUTH }, { from: Paths.ERROR_CHECK_EMAIL })
                break;
            case ModalErrors.ChangePasswordError:
                history.push({ pathname: Paths.CHANGE_PASSWORD }, { from: Paths.CHANGE_PASSWORD_ERROR })
                break;
            case ModalModes.CreateFeedbackSuccess:
                setMode(null)
                break;
            case ModalModes.GetFeedbacksError:
                setMode(null)
                navigate(Paths.MAIN)
                break;
        }
    }

    return (
        <div className={classNames(
            cls.wrapper,
            className,
            mode === ModalErrors.LoginError && cls.login,
            (mode === ModalErrors.CheckEmailError || mode === ModalModes.GetFeedbacksError) && cls.anyError,
        )}>
            <Icon component={() => <img src={icons[mode]} />} className={cls.icon} />
            {headerTitle[mode]}
            {headerText[mode]}
            {buttons ?? <Button
                className={cls.button}
                onClick={handleButtonClick}
                data-test-id={testId[mode]}
            >
                {buttonText[mode]}
            </Button>}
        </div>
    )
}