import { Header } from "antd/lib/layout/layout"
import cls from './header.module.scss'
import { Button, Row, Typography } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import { useResize } from "@hooks/use-resize"
interface PageHeaderProps {
    isSiderCollapsed: boolean;
}
export const PageHeader = ({ isSiderCollapsed }: PageHeaderProps) => {
    const { width } = useResize()

    if (width)
        return (
            <Header className={cls.header}>
                <Row className={cls.wrapper}>
                    <Typography.Text className={cls.pageTitle}>Главная</Typography.Text>
                    <Row justify='space-between' align='top'>
                        <Typography.Title
                            level={width > 900
                                ? 1
                                : width > 600
                                    ? 3
                                    : 4
                            }
                            className={cls.headerTitle}
                        >
                            Приветствуем тебя {width < 540 && <br />}в CleverFit — {width && width < 1200 && width > 540 && !isSiderCollapsed && <br />}приложении,{width && (width >= 1200 || width < 900) && <br />} которое поможет тебе добиться своей мечты!
                        </Typography.Title>
                        <Button
                            shape={width < 540 ? 'circle' : 'default'}
                            icon={width && (width > 1200 || width < 540) ? <SettingOutlined /> : null}
                            className={cls.settingsButton}
                        >
                            {width >= 540 && 'Настройки'}
                        </Button>
                    </Row>
                </Row>
            </Header>
        )
}