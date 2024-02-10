import { Header } from "antd/lib/layout/layout"
import cls from './header.module.scss'
import { Button, Flex, Typography } from "antd"
import { SettingOutlined } from "@ant-design/icons"


export const PageHeader = () => {

    return (
        <Header className={cls.header}>
            <Typography.Text>Главная</Typography.Text>
            <Flex justify='space-between' align='center'>
                <Typography.Title level={1} className={cls.headerTitle}>
                    Приветствуем тебя в CleverFit — приложении,<br /> которое поможет тебе добиться своей мечты!
                </Typography.Title>
                <Button
                    icon={<SettingOutlined />}
                    className={cls.settingsButton}
                >
                    Настройки
                </Button>
            </Flex>

        </Header>
    )
}