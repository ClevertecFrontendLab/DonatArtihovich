import { Header } from "antd/lib/layout/layout"
import cls from './header.module.scss'
import { Button, Flex, Typography } from "antd"
import { SettingOutlined } from "@ant-design/icons"


export const PageHeader = () => {

    return (
        <Header className={cls.header}>
            <Flex vertical className={cls.wrapper}>
                <Typography.Text className={cls.pageTitle}>Главная</Typography.Text>
                <Flex justify='space-between' align='flex-start'>
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
            </Flex>
        </Header>
    )
}