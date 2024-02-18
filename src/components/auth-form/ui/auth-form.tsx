import { Button, Checkbox, Form, Input, Menu, MenuProps } from "antd"
import logoIcon from '@assets/images/logo.svg'
import cls from './auth-form.module.scss'
import Icon from "@ant-design/icons/lib/components/Icon"
import { useState } from "react"
import { Link } from "react-router-dom"
import { GoogleOutlined, GooglePlusOutlined } from "@ant-design/icons"

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

export const AuthForm = () => {
    const [selectedMode, setSelectedMode] = useState<string>('login')

    const onMenuClick: MenuProps['onClick'] = (e) => {
        setSelectedMode(e.key)
    }

    return (
        <div className={cls.form}>
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
                    className={cls.loginEmailInput}
                />
                <Input.Password
                    placeholder="Пароль"
                    className={cls.loginPasswordInput}
                />

                <div className={cls.checkboxWrapper}>
                    <Checkbox className={cls.checkboxInput}>Запомнить меня</Checkbox>
                    <Link to='' className={cls.passwordForgetLink}>Забыли пароль?</Link>
                </div>

                <div className={cls.buttonsWrapper}>
                    <Button className={cls.submitButton}>Войти</Button>
                    <Button icon={<GooglePlusOutlined />} className={cls.googleButton}>Войти через Google</Button>
                </div>
            </Form.Item>
        </div>
    )
}