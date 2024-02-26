import { ModalPage } from "@components/modal"
import cls from './confirm-email.module.scss'
import infoIcon from '@assets/images/info.svg'
import errorIcon from '@assets/images/cross.svg'
import Icon from "@ant-design/icons/lib/components/Icon"
import { Typography } from "antd"
import VerificationInput from "react-verification-input"
import { useWindowSize } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { userSelector } from "@redux/model/user"
import { useConfirmEmailMutation } from "@redux/api/auth-api"
import { classNames } from "@utils/lib"
import { useNavigate } from "react-router-dom"
import { Paths } from "@utils/const/paths"

export const ConfirmEmailPage = () => {
    const [value, setValue] = useState<string>('')
    const { width } = useWindowSize()
    const { email } = useAppSelector(userSelector)
    const navigate = useNavigate()

    const [confirmEmail, {
        isSuccess: isConfirmEmailSuccess,
        isError: isConfirmEmailError
    }] = useConfirmEmailMutation()

    useEffect(() => {
        if (email && value.length === 6) {
            confirmEmail({ email, code: value })
        }
    }, [value])

    useEffect(() => {
        if (isConfirmEmailError) {
            setValue('')
        }
    }, [isConfirmEmailError])

    useEffect(() => {
        if (isConfirmEmailSuccess) {
            navigate(Paths.CHANGE_PASSWORD)
        }
    }, [isConfirmEmailSuccess])

    return (
        <ModalPage className={classNames(cls.modal, isConfirmEmailError && cls.errorModal)}>
            <div className={cls.wrapper}>
                <Icon
                    component={() => <img src={isConfirmEmailError ? errorIcon : infoIcon} />}
                    className={cls.icon}
                />
                <div className={cls.header}>
                    {isConfirmEmailError
                        ? <Typography.Title className={cls.headerTitle}>
                            Неверный код. Введите код{width && width > 600 && <br />} для восстановления{width && width <= 600} аккаунта
                        </Typography.Title>
                        : <Typography.Title className={cls.headerTitle}>
                            Введите код<br /> для восстановления аккаунта
                        </Typography.Title>}
                    <Typography.Text className={cls.headerText}>
                        Мы отправили вам на e-mail <span className={cls.email}>{email}</span><br />шестизначный код. Введите его в поле {width && width <= 600 && <br />}ниже.
                    </Typography.Text>
                </div>
                <VerificationInput
                    placeholder=""
                    length={6}
                    value={value}
                    onChange={(value: string) => setValue(value)}
                    data-test-id='verification-input'
                />
                <Typography.Text className={cls.helpText}>Не пришло письмо? Проверьте{width && width <= 600 && <br />} папку Спам.</Typography.Text>
            </div>
        </ModalPage >
    )
}