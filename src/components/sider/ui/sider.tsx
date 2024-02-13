import { Button, Divider, Flex, Layout, Menu, } from 'antd'
import cls from './sider.module.scss'
import { CalendarOutlined, HeartFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import logoIcon from '@assets/images/logo.svg'
import fitIcon from '@assets/images/fit.svg'
import exitIcon from '@assets/images/exit.svg'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';
import { useWindowSize } from '@uidotdev/usehooks';

interface PageSiderProps {
    isCollapsed: boolean;
    setIsCollapsed: (b: boolean) => void;
}

const menuItems: MenuItemType[] = [
    { label: 'Календарь', key: 'calendar', icon: <CalendarOutlined /> },
    { label: 'Тренировки', key: 'workouts', icon: <HeartFilled /> },
    { label: 'Достижения', key: 'scores', icon: <TrophyFilled /> },
    { label: 'Профиль', key: 'profile', icon: <IdcardOutlined /> },
]

export const PageSider = ({ isCollapsed, setIsCollapsed }: PageSiderProps) => {
    const { width } = useWindowSize()

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <Layout.Sider
            className={classNames(cls.sider, isCollapsed && cls.collapsed)}
            collapsed={isCollapsed}
            width={width && width >= 834 ? '208' : '29.44vw'}
            collapsedWidth={width && width < 702 ? '29.44vw' : '64'}
        >
            <Flex vertical justify='space-between' className={cls.siderFlex}>
                <Flex vertical className={cls.siderMainWrapper}>
                    <Flex
                        className={cls.logoWrapper}
                        justify={!isCollapsed ? 'flex-start' : 'center'}
                        align='flex-end'
                    >
                        <Flex align='baseline'>
                            {isCollapsed
                                ? <Icon component={() => <img src={fitIcon} className={cls.fitIcon} />} />
                                : <Icon component={() => <img src={logoIcon} className={cls.logoIcon} />} />
                            }
                        </Flex>
                    </Flex>
                    <Menu
                        mode='inline'
                        className={cls.siderMenu}
                        items={menuItems}
                    />
                </Flex>

                <Flex vertical>
                    <Divider style={{ margin: 0 }} />
                    <Button
                        icon={<Icon component={() => <img src={exitIcon}></img>} />}
                        className={cls.exitButton}
                    >
                        {!isCollapsed && 'Выход'}
                    </Button>
                </Flex>
            </Flex>
            <Flex vertical justify='center' align='center' className={cls.toggleSidebarButtonWrapper}>
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
                    style={{ width: 20, height: 32 }}
                    data-test-id={width && width >= 702 ? 'sider-switch' : 'sider-switch-mobile'}
                />
            </Flex>
        </Layout.Sider>
    )
}