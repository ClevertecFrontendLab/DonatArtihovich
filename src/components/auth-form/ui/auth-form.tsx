import { Button, Checkbox, Form, Input, Menu, MenuProps } from "antd"
import logoIcon from '@assets/images/logo.svg'
import cls from './auth-form.module.scss'
import Icon from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GooglePlusOutlined } from "@ant-design/icons"
import { classNames } from "@utils/lib"
import { useWindowSize } from "@uidotdev/usehooks"
import { Paths } from "@utils/const/paths"
import { useRegisterUserMutation, useLoginUserMutation } from "@redux/api/auth-api"
import { useAppDispatch } from "@hooks/typed-react-redux-hooks"
import { setUser } from "@redux/model/user/user-slice"
import { AuthLoader } from "@components/loader"

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
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { width } = useWindowSize()

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
        if (isRegisterError) {
            const error = registerError as IError;

            if (error.data.statusCode === 409) {
                navigate(Paths.REGISTRATION_USER_EXIST_ERROR);
            } else {
                navigate(Paths.REGISTRATION_ERROR);
            }
        }

        if (isLoginError) {
            navigate(Paths.LOGIN_ERROR);
        }
    }, [isLoginError, isRegisterError])

    useEffect(() => {
        if (isRegisterSuccess) {
            navigate(Paths.REGISTRATION_SUCCESS);
        }

        if (isLoginSuccess) {
            dispatch(setUser({ token: loginData.accessToken }))

            if (isChecked) {
                localStorage.setItem('user', loginData.accessToken)
            }

            navigate(Paths.MAIN);
        }
    }, [isLoginSuccess, isRegisterSuccess])

    const onMenuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key === 'login' ? Paths.AUTH : Paths.REGISTRATION)
    }

    const onSubmit = (values: IRegisterValues | ILoginValues) => {
        console.log(mode, ': ', values)

        if (mode === 'registration') {
            registerUser(values)
        } else {
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
            setIsEmailValid(true)
        }).catch(() => {
            setIsEmailValid(false)
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
                                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/
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
                            {isEmailValid
                                ? <Link
                                    to={Paths.CONFIRM_EMAIL}
                                    className={cls.passwordForgetLink}
                                >
                                    Забыли пароль?
                                </Link>
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
