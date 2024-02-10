import { Button, Divider, Flex, Layout, Menu, } from 'antd'
import cls from './sider.module.scss'
import { CalendarOutlined, HeartFilled, IdcardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TrophyFilled } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import cleverIcon from '@assets/images/clever.svg'
import fitIcon from '@assets/images/fit.svg'
import exitIcon from '@assets/images/exit.svg'
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useState } from 'react';

const menuItems: MenuItemType[] = [
    { label: 'Календарь', key: 'calendar', icon: <CalendarOutlined /> },
    { label: 'Тренировки', key: 'workouts', icon: <HeartFilled /> },
    { label: 'Достижения', key: 'scores', icon: <TrophyFilled /> },
    { label: 'Профиль', key: 'profile', icon: <IdcardOutlined /> },
]

export const PageSider = () => {
    const [isMenu, setIsMenu] = useState(true);

    const toggleMenu = () => {
        setIsMenu(!isMenu)
    }

    return (
        <Layout.Sider className={cls.sider} collapsed={!isMenu}>
            <Flex vertical justify='space-between' className={cls.siderFlex}>
                <Flex vertical gap={50}>
                    <Flex className={cls.logoWrapper} justify='center' align='flex-end'>
                        <Flex>
                            {isMenu && <Icon component={() => <img src={cleverIcon} />} />}
                            <Icon component={() => <img src={fitIcon} />} />
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
                        {isMenu && 'Выход'}
                    </Button>
                </Flex>
            </Flex>
            <Button
                className={cls.toggleSidebarButton}
                icon={isMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                onClick={toggleMenu}
            />
        </Layout.Sider>
    )
}