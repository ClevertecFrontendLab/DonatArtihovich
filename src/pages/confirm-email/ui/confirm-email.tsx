import { ModalPage } from "@components/modal"
import cls from './confirm-email.module.scss'
import infoIcon from '@assets/images/info.svg'
import Icon from "@ant-design/icons/lib/components/Icon"
import { Typography } from "antd"
import VerificationInput from "react-verification-input"
import { useWindowSize } from "@uidotdev/usehooks"
import { useState } from "react"

export const ConfirmEmailPage = () => {
    const [value, setValue] = useState<string>()
    const { width } = useWindowSize()

    return (
        <ModalPage className={cls.modal}>
            <div className={cls.wrapper}>
                <Icon
                    component={() => <img src={infoIcon} />}
                    className={cls.icon}
                />
                <div className={cls.header}>
                    <Typography.Title className={cls.headerTitle}>
                        Введите код<br /> для восстановления аккаунта
                    </Typography.Title>
                    <Typography.Text className={cls.headerText}>
                        Мы отправили вам на e-mail <span className={cls.email}>victorbyden@gmail.com</span><br />шестизначный код. Введите его в поле {width && width <= 600 && <br />}ниже.
                    </Typography.Text>
                </div>
                <VerificationInput
                    placeholder=""
                    length={6}
                    value={value}
                    onChange={(value: string) => setValue(value)}
                />
                <Typography.Text className={cls.helpText}>Не пришло письмо? Проверьте{width && width <= 600 && <br />} папку Спам.</Typography.Text>
            </div>
        </ModalPage >
    )
}