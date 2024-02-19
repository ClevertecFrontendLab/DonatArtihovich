import { Button, Checkbox, Form, Input, Menu, MenuProps } from "antd"
import logoIcon from '@assets/images/logo.svg'
import cls from './auth-form.module.scss'
import Icon from "@ant-design/icons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GooglePlusOutlined } from "@ant-design/icons"
import { classNames } from "@utils/lib"
import { useWindowSize } from "@uidotdev/usehooks"
import { Paths } from "@utils/const/paths"

interface AuthFormProps {
    mode: string;
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
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { width } = useWindowSize()

    const onMenuClick: MenuProps['onClick'] = (e) => {
        navigate(e.key === 'login' ? Paths.AUTH : Paths.REGISTRATION)
    }

    const onSubmit = (values: Record<string, string>) => {
        console.log(values)
    }

    const validatePassword = (_: any, value: string) => {
        const { getFieldValue } = form

        if (value && value !== getFieldValue('password')) {
            return Promise.reject(new Error('Пароли не совпадают'))
        }

        return Promise.resolve()
    }

    return (
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
                    rules={mode === 'registration' ? [{
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                        message: ''
                    }]
                        : undefined}
                >
                    <Input
                        addonBefore='e-mail:'
                        type='text'
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
                                className={cls.checkboxInput}
                            >
                                Запомнить меня
                            </Checkbox>
                        </Form.Item>
                        <Link to='' className={cls.passwordForgetLink}>Забыли пароль?</Link>
                    </div>
                }
            </div>

            <div className={cls.buttonsWrapper}>
                <Button className={cls.submitButton} htmlType='submit' type='primary'>Войти</Button>
                <Button icon={width && width < 500 ? null : <GooglePlusOutlined />} className={cls.googleButton}>{mode === 'login' ? 'Войти' : 'Регистрация'} через Google</Button>
            </div>
        </Form>
    )
}
