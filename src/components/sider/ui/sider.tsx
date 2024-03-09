import { Button, Divider, Layout, Menu } from 'antd'
import { useMemo } from 'react';
import cls from './sider.module.scss'
import { CalendarOutlined, HeartFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import logoIcon from '@assets/images/logo.svg'
import fitIcon from '@assets/images/fit.svg'
import exitIcon from '@assets/images/exit.svg'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { classNames } from '@utils/lib/class-names';
import { useWindowSize } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@utils/const/paths';
import { MainContent } from '@utils/const/main-content';

type PageSiderProps = {
    isCollapsed: boolean;
    setIsCollapsed: (b: boolean) => void;
    setContent: (c: MainContent) => void;
    content: MainContent;
}

export const PageSider = ({ isCollapsed, setIsCollapsed, setContent, content }: PageSiderProps) => {
    const { width } = useWindowSize()
    const navigate = useNavigate()

    const menuItems: MenuItemType[] = useMemo(() => [
        { label: 'Календарь', key: 'calendar', icon: <CalendarOutlined />, onClick: () => setContent(MainContent.Calendar) },
        { label: 'Тренировки', key: 'workouts', icon: <HeartFilled />, onClick: () => setContent(MainContent.Workouts) },
        { label: 'Достижения', key: 'scores', icon: <TrophyFilled />, onClick: () => setContent(MainContent.Scores) },
        { label: 'Профиль', key: 'profile', icon: <IdcardOutlined />, onClick: () => setContent(MainContent.Profile) },
    ], [setContent])

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }

    const onLogoutClick = () => {
        localStorage.clear()
        navigate(Paths.AUTH)
    }

    return (
        <Layout.Sider
            className={classNames(cls.sider, isCollapsed && cls.collapsed)}
            collapsed={isCollapsed}
            width={width && width >= 834 ? '208' : '29.44vw'}
            collapsedWidth={width && width < 702 ? '29.44vw' : '64'}
        >
            <div className={cls.siderFlex}>
                <div className={cls.siderMainWrapper}>
                    <div
                        className={cls.logoWrapper}
                        onClick={() => setContent(MainContent.Main)}
                    >
                        {isCollapsed
                            ? <Icon component={() => <img src={fitIcon} className={cls.fitIcon} />} />
                            : <Icon component={() => <img src={logoIcon} className={cls.logoIcon} />} />
                        }
                    </div>
                    <Menu
                        mode='inline'
                        className={cls.siderMenu}
                        items={menuItems}
                        selectedKeys={[content]}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Divider style={{ margin: 0 }} />
                    <Button
                        icon={<Icon component={() => <img src={exitIcon}></img>} />}
                        className={cls.exitButton}
                        onClick={onLogoutClick}
                    >
                        {!isCollapsed && 'Выход'}
                    </Button>
                </div>
            </div>
            <div className={cls.toggleSidebarButtonWrapper}>
                <Button
                    className={cls.toggleSidebarButton}
                    icon={!isCollapsed
                        ? <MenuFoldOutlined
                            width={width && width < 540 ? 16 : undefined}
                        />
                        : <MenuUnfoldOutlined
                            width={width && width < 540 ? 16 : undefined}
                        />}
                    onClick={toggleMenu}
                    style={{ width: 20, height: 32, border: 'none' }}
                    data-test-id={width && width >= 702 ? 'sider-switch' : 'sider-switch-mobile'}
                />
            </div>
        </Layout.Sider>
    )
}