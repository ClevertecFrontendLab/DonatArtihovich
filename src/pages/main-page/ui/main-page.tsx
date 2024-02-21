import { PageFooter } from '@components/footer';
import { MainContent } from '@components/main-content';
import { PageSider } from '@components/sider';
import { PageHeader } from '@components/header';
import { Layout, Row } from 'antd';
import backgroundImage from '@assets/images/background.png';
import cls from './main-page.module.scss'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@utils/const/paths';

interface MainPageProps {
    isSiderCollapsed: boolean;
    setIsSiderCollapsed: (b: boolean) => void;
}

export const MainPage = ({ isSiderCollapsed, setIsSiderCollapsed }: MainPageProps) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate(Paths.AUTH)
        }
    }, [])

    return (
        <Row justify='center' className={cls.wrapper}>
            <Layout className={cls.app} data-test-id='app' style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div style={{ display: 'flex' }}>
                    <PageSider
                        isCollapsed={isSiderCollapsed}
                        setIsCollapsed={setIsSiderCollapsed}
                    />
                    <Layout style={{ background: 'transparent' }} className={cls.contentLayout}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <PageHeader
                                isSiderCollapsed={isSiderCollapsed}
                            />
                            <MainContent isSiderCollapsed={isSiderCollapsed} />
                            <PageFooter isSiderCollapsed={isSiderCollapsed} />
                        </div>
                    </Layout>
                </div>
            </Layout>
        </Row>
    )
};
