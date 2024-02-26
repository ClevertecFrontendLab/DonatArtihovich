import { Button, Checkbox, Form, Input, Menu, MenuProps } from "antd"
import logoIcon from '@assets/images/logo.svg'
import cls from './auth-form.module.scss'
import Icon from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { GooglePlusOutlined } from "@ant-design/icons"
import { classNames } from "@utils/lib"
import { useWindowSize } from "@uidotdev/usehooks"
import { Paths } from "@utils/const/paths"
import { useRegisterUserMutation, useLoginUserMutation, useCheckEmailMutation } from "@redux/api/auth-api"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { setUserToken, setUserEmail } from "@redux/model/user"
import { AuthLoader } from "@components/loader"
import { userSelector } from "@redux/model/user"
import { useRequiredContext } from "@hooks/typed-use-context-hook"
import { AuthContext } from "@processes/auth"
// import { history } from "@redux/configure-store"

interface AuthFormProps {
    mode: string;
}

interface IRegisterValues {
    email: string;
    password: string;
    passwordRepeat: string;
}

interface ILoginValues {
    email: string;
    password: string;
    remember: boolean;
}

const menuItems: MenuProps['items'] = [
    {
        label: 'Вход',
        key: 'login'
    },
    {
        label: 'Регистрация',
        key: 'registration'
    }
]

export const AuthForm = ({ mode }: AuthFormProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [isPasswordChangingDisabled, setIsPasswordChangingDisabled] = useState<boolean>(true)
    const [form] = Form.useForm()
    const { getFieldValue } = form
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const { width } = useWindowSize()

    const {
        setIsLoginProcess,
        setIsRegistrationProcess,
        setIsChangePasswordProcess
    } = useRequiredContext(AuthContext)
    const [checkEmail,
        {
            isSuccess: isCheckEmailSuccess,
            isError: isCheckEmailError,
            error: checkEmailError
        }] = useCheckEmailMutation()

    const [registerUser, {
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        error: registerError
    }] = useRegisterUserMutation()

    const [loginUser, {
        data: loginData,
        isLoading: isLoginLoading,
        isSuccess: isLoginSuccess,
        isError: isLoginError,
    }] = useLoginUserMutation()

    useEffect(() => {
        if (mode === 'registration' && location.state?.from === Paths.REGISTRATION_USER_EXIST_ERROR) {
            setIsRegistrationProcess(true)
            registerUser({ email: user.email, password: user.password } as { email: string, password: string })
        }
        if (location.state?.from === Paths.ERROR_CHECK_EMAIL) {
            setIsLoginProcess(true)
            checkEmail({ email: user.email } as { email: string })
        }
    }, [])

    useEffect(() => {
        if (isRegisterError) {
            const error = registerError as IError;

            if (error.status === 409) {
                navigate(Paths.REGISTRATION_USER_EXIST_ERROR);
            } else {
                navigate(Paths.REGISTRATION_ERROR);
            }
        }

        if (isLoginError) {
            navigate(Paths.LOGIN_ERROR);
        }

        if (isCheckEmailError) {
            const error = checkEmailError as IError

            if (error.status === 404 && error.data.message === 'Email не найден') {
                navigate(Paths.ERROR_CHECK_EMAIL_NO_EXIST)
            } else {
                navigate(Paths.ERROR_CHECK_EMAIL)
            }
        }
    }, [isLoginError, isRegisterError, isCheckEmailError])

    useEffect(() => {
        if (isRegisterSuccess) {
            navigate(Paths.REGISTRATION_SUCCESS);
        }

        if (isLoginSuccess) {
            dispatch(setUserToken({ token: loginData.accessToken }))

            if (isChecked) {
                localStorage.setItem('user', loginData.accessToken)
            }

            navigate(Paths.MAIN);
        }

        if (isCheckEmailSuccess) {
            dispatch(setUserEmail({ ...user, email: getFieldValue('email') }))
            navigate(Paths.CONFIRM_EMAIL)
        }
    }, [isLoginSuccess, isRegisterSuccess, isCheckEmailSuccess])

    const onMenuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key === 'login' ? Paths.AUTH : Paths.REGISTRATION)
    }

    const onSubmit = (values: IRegisterValues | ILoginValues) => {
        if (mode === 'registration') {
            setIsRegistrationProcess(true)
            dispatch(setUserEmail({ email: values.email }))
            registerUser(values)
        } else {
            setIsLoginProcess(true)
            dispatch(setUserEmail({ email: values.email }))
            loginUser(values)
        }
    }

    const validatePassword = (_: any, value: string) => {
        const { getFieldValue } = form

        if (value && value !== getFieldValue('password')) {
            return Promise.reject(new Error('Пароли не совпадают'))
        }

        return Promise.resolve()
    }

    const onEmailChange = () => {
        console.log('email change')
        form.validateFields(['email']).then(() => {
            setIsPasswordChangingDisabled(false)
        }).catch(() => {
            setIsPasswordChangingDisabled(true)
        })
    }

    const onPasswordForgetClick = () => {
        form.validateFields(['email'])
            .then(() => {
                const { getFieldValue } = form
                const email = getFieldValue('email')
                setIsChangePasswordProcess(true)
                checkEmail({ email })
            })
            .catch(() => {
                setIsPasswordChangingDisabled(true)
            })
    }

    return (
        <>
            {(isLoginLoading || isRegisterLoading) && <AuthLoader />}
            <Form form={form} onFinish={onSubmit} className={classNames(cls.form, mode === 'registration' && cls.registrationForm)}>
                <Icon
                    component={() => <img src={logoIcon} />}
                    className={cls.logoImage}
                />
                <Menu
                    onClick={onMenuClick}
                    selectedKeys={[mode]}
                    mode='horizontal'
                    items={menuItems}
                    className={cls.menu}
                />
                <div className={cls.loginForm}>
                    <Form.Item
                        className={cls.emailInput}
                        name='email'
                        rules={[
                            {
                                required: true,
                                pattern: /\S+@\S+\.\S+/,
                                message: ''
                            }
                        ]}
                    >
                        <Input
                            addonBefore='e-mail:'
                            type='text'
                            onChange={onEmailChange}
                        />
                    </Form.Item>
                    {mode === 'registration' ?
                        <Form.Item
                            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            className={cls.passwordInput}
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}$/
                                }
                            ]}
                        >
                            <Input.Password
                                placeholder="Пароль"
                            />
                        </Form.Item>
                        : <Form.Item className={cls.passwordInput} name='password'>
                            <Input.Password
                                placeholder="Пароль"
                            />
                        </Form.Item>
                    }

                    {mode === 'registration' &&
                        <Form.Item className={cls.passwordInput} name='passwordRepeat'
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
                            <Input.Password
                                placeholder="Повторите пароль"
                            />
                        </Form.Item>}

                    {mode === 'login' &&
                        <div className={cls.checkboxWrapper}>
                            <Form.Item name='remember'>
                                <Checkbox
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    value={isChecked}
                                    className={cls.checkboxInput}
                                >
                                    Запомнить меня
                                </Checkbox>
                            </Form.Item>
                            {!isPasswordChangingDisabled
                                ? <span
                                    className={cls.passwordForgetLink}
                                    onClick={onPasswordForgetClick}
                                >
                                    Забыли пароль?
                                </span>
                                : <span
                                    className={cls.passwordForgetLink}
                                >
                                    Забыли пароль?
                                </span>
                            }
                        </div>
                    }
                </div>

                <div className={cls.buttonsWrapper}>
                    <Button className={cls.submitButton} htmlType='submit' type='primary'>Войти</Button>
                    <Button icon={width && width < 500 ? null : <GooglePlusOutlined />} className={cls.googleButton}>{mode === 'login' ? 'Войти' : 'Регистрация'} через Google</Button>
                </div>
            </Form>
        </>
    )
}
