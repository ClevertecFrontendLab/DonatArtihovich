import { Button, Checkbox, Form, Input, Menu, MenuProps } from "antd"
import logoIcon from '@assets/images/logo.svg'
import cls from './auth-form.module.scss'
import Icon from "@ant-design/icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import { GooglePlusOutlined } from "@ant-design/icons"
import { classNames } from "@utils/lib"
import { useWindowSize } from "@uidotdev/usehooks"

interface AuthFormProps {
    selectedMode: string;
    setSelectedMode: (b: string) => void;
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

export const AuthForm = ({ selectedMode, setSelectedMode }: AuthFormProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const { width } = useWindowSize()

    const onMenuClick: MenuProps['onClick'] = (e) => {
        setSelectedMode(e.key)
    }

    return (
        <div className={classNames(cls.form, selectedMode === 'registration' && cls.registrationForm)}>
            <Icon
                component={() => <img src={logoIcon} />}
                className={cls.logoImage}
            />
            <Menu
                onClick={onMenuClick}
                selectedKeys={[selectedMode]}
                mode='horizontal'
                items={menuItems}
                className={cls.menu}
            />
            <Form.Item className={cls.loginForm}>
                <Input
                    addonBefore='e-mail:'
                    type='text'
                    className={cls.emailInput}
                />

                {selectedMode === 'registration' ?
                    <Form.Item help='Пароль не менее 8 символов, с заглавной буквой и цифрой'>
                        <Input.Password
                            placeholder="Пароль"
                            className={cls.passwordInput}
                        />
                    </Form.Item>
                    : <Input.Password
                        placeholder="Пароль"
                        className={cls.passwordInput}
                    />
                }

                {selectedMode === 'registration' &&
                    <Input.Password
                        placeholder="Повторите пароль"
                        className={cls.passwordInput}
                    />
                }

                {selectedMode === 'login' &&
                    <div className={cls.checkboxWrapper}>
                        <Checkbox
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            className={cls.checkboxInput}
                        >Запомнить меня</Checkbox>
                        <Link to='' className={cls.passwordForgetLink}>Забыли пароль?</Link>
                    </div>

                }
            </Form.Item>

            <div className={cls.buttonsWrapper}>
                <Button className={cls.submitButton}>Войти</Button>
                <Button icon={width && width < 500 ? null : <GooglePlusOutlined />} className={cls.googleButton}>{selectedMode === 'login' ? 'Войти' : 'Регистрация'} через Google</Button>
            </div>
        </div>
    )
}