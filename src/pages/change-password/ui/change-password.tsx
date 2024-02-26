import { ModalPage } from "@components/modal"
import cls from './change-password.module.scss'
import { Button, Form, Typography } from "antd"
import Password from "antd/lib/input/Password"
import { useWindowSize } from "@uidotdev/usehooks"
import { useChangePasswordMutation } from "@redux/api/auth-api"
import { useEffect } from "react"

export const ChangePasswordPage = () => {
    const { width } = useWindowSize()
    const [form] = Form.useForm()
    const { getFieldValue } = form
    const [changePassword, {
        isSuccess: isChangePasswordSuccess,
        isError: isChangePasswordError,
    }] = useChangePasswordMutation()

    const validatePassword = () => {
        if (getFieldValue('password') === getFieldValue('confirmPassword')) {
            return Promise.resolve()
        }

        return Promise.reject()
    }

    const onFormSubmit = (values: { password: string, confirmPassword: string }) => {
        console.log(values)
        changePassword(values)
    }

    useEffect(() => {
        if (isChangePasswordSuccess) {
            alert('success')
        }
    }, [isChangePasswordError, isChangePasswordSuccess])

    return (
        <ModalPage className={cls.modal}>
            <div className={cls.wrapper}>
                <Typography.Title className={cls.headerTitle}>Восстановление{width && width <= 600 && <br />} аккаунта</Typography.Title>
                <Form form={form} className={cls.passwordForm} onFinish={onFormSubmit}>
                    <Form.Item
                        name='password'
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        className={cls.passwordInputWrapper}
                        rules={[
                            {
                                required: true,
                                pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/
                            }
                        ]}
                    >
                        <Password
                            className={cls.passwordInput}
                            placeholder="Новый пароль"
                        />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        className={cls.passwordInputWrapper}
                        rules={[
                            {
                                required: true,
                                message: ''
                            },
                            {
                                validator: validatePassword,
                                message: 'Пароли не совпадают'
                            }
                        ]}
                    >
                        <Password
                            className={cls.passwordInput}
                            placeholder="Повторите пароль"
                        />
                    </Form.Item>

                    <Button className={cls.submitButton} type="primary" htmlType="submit">Сохранить</Button>
                </Form>
            </div>
        </ModalPage>
    )
}