import { Button, Divider, Flex, Layout, Menu, } from 'antd'
import cls from './sider.module.scss'
import { CalendarOutlined, HeartFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import logoIcon from '@assets/images/logo.svg'
import fitIcon from '@assets/images/fit.svg'
import exitIcon from '@assets/images/exit.svg'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import classNames from 'classnames';

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
    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <Layout.Sider className={classNames(cls.sider, isCollapsed && cls.collapsed)} collapsed={isCollapsed} width={'208'} collapsedWidth={'64'}>
            <Flex vertical justify='space-between' className={cls.siderFlex}>
                <Flex vertical className={cls.siderMainWrapper}>
                    <Flex className={cls.logoWrapper} justify={!isCollapsed ? 'flex-start' : 'center'} align='flex-end'>
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
            <Flex vertical justify='center' className={cls.toggleSidebarButtonWrapper}>
                <Button
                    className={cls.toggleSidebarButton}
                    icon={!isCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                    onClick={toggleMenu}
                    style={{ width: 20, height: 32 }}
                />
            </Flex>

        </Layout.Sider>
    )
}