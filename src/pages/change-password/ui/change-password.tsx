import { ModalPage } from "@components/modal"
import cls from './change-password.module.scss'
import { Button, Form, Typography } from "antd"
import Password from "antd/lib/input/Password"
import { useWindowSize } from "@uidotdev/usehooks"

export const ChangePasswordPage = () => {
    const { width } = useWindowSize()

    return (
        <ModalPage className={cls.modal}>
            <div className={cls.wrapper}>
                <Typography.Title className={cls.headerTitle}>Восстановление{width && width <= 600 && <br />} аккаунта</Typography.Title>
                <Form className={cls.passwordForm}>
                    <Form.Item
                        name='password'
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        className={cls.passwordInputWrapper}
                    >
                        <Password
                            className={cls.passwordInput}
                            placeholder="Новый пароль"
                        />
                    </Form.Item>
                    <Form.Item name='confirmPassword' className={cls.passwordInputWrapper}>
                        <Password
                            className={cls.passwordInput}
                            placeholder="Повторите пароль"
                        />
                    </Form.Item>

                    <Button className={cls.submitButton}>Сохранить</Button>
                </Form>
            </div>
        </ModalPage>
    )
}