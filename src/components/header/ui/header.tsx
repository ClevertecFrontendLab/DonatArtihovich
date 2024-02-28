import { Header } from "antd/lib/layout/layout"
import cls from './header.module.scss'
import { Button, Typography } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import { useWindowSize } from "@uidotdev/usehooks"
import { Link, useLocation } from "react-router-dom"
import { Paths } from "@utils/const/paths"

type PageHeaderProps = {
    isSiderCollapsed: boolean;
}

export const PageHeader = ({ isSiderCollapsed }: PageHeaderProps) => {
    const { width } = useWindowSize()
    const { pathname } = useLocation()

    const pageTitle = {
        [Paths.FEEDBACKS]: 'Отзывы пользователей'
    } as Record<Paths, string>

    if (width)
        return (
            <Header className={cls.header}>
                <div style={{ flex: 1 }} className={cls.wrapper}>
                    {pathname === '/main'
                        ? <Typography.Text className={cls.pageTitle}>Главная</Typography.Text>
                        : <div className={cls.pageTitleWrapper}>
                            <Link className={cls.mainLink} to={Paths.MAIN}>Главная</Link>
                            <Typography.Text className={cls.slash}>/</Typography.Text>
                            <Typography.Text className={cls.pageTitle}>{pageTitle[pathname as Paths]}</Typography.Text>
                        </div>
                    }
                    <div className={cls.headerMainFlex}>
                        <Typography.Title
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
                    </div>
                </div>
            </Header >
        )
}