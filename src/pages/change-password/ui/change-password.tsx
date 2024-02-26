import { ModalPage } from "@components/modal"
import cls from './change-password.module.scss'
import { Button, Form, Typography } from "antd"
import Password from "antd/lib/input/Password"
import { useWindowSize } from "@uidotdev/usehooks"
import { useChangePasswordMutation } from "@redux/api/auth-api"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Paths } from "@utils/const/paths"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { userSelector } from "@redux/model/user"
import { useRequiredContext } from "@hooks/typed-use-context-hook"
import { AuthContext } from "@processes/auth"
import { setUserPassword } from "@redux/model/user/user-slice"

export const ChangePasswordPage = () => {
    const { password } = useAppSelector(userSelector)
    const { width } = useWindowSize()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const { getFieldValue } = form
    const [changePassword, {
        isSuccess: isChangePasswordSuccess,
        isError: isChangePasswordError,
    }] = useChangePasswordMutation()
    const { setIsChangePasswordProcess } = useRequiredContext(AuthContext)
    const dispatch = useAppDispatch()
    const location = useLocation()

    const validatePassword = () => {
        if (getFieldValue('password') === getFieldValue('confirmPassword')) {
            return Promise.resolve()
        }

        return Promise.reject()
    }

    const onFormSubmit = (values: { password: string, confirmPassword: string }) => {
        dispatch(setUserPassword({ password: values.password }))
        changePassword(values)
    }

    useEffect(() => {
        if (location.state?.from === Paths.CHANGE_PASSWORD_ERROR) {
            setIsChangePasswordProcess(true)
            changePassword({ password, confirmPassword: password } as { password: string, confirmPassword: string })
        }
    })

    useEffect(() => {
        if (isChangePasswordSuccess) {
            navigate(Paths.CHANGE_PASSWORD_SUCCESS)
        } else if (isChangePasswordError) {
            navigate(Paths.CHANGE_PASSWORD_ERROR)
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
                                pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/
                            }
                        ]}
                    >
                        <Password
                            className={cls.passwordInput}
                            placeholder="Новый пароль"
                            data-test-id='change-password'
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
                            data-test-id='change-confirm-password'
                        />
                    </Form.Item>

                    <Button
                        className={cls.submitButton}
                        type="primary"
                        htmlType="submit"
                        data-test-id='change-submit-button'
                    >Сохранить</Button>
                </Form>
            </div>
        </ModalPage>
    )
}