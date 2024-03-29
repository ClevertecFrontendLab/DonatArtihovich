import { Layout, Row } from 'antd';
import cls from './page-layout.module.scss'
import { GlobalModal } from '@components/global-modal/ui/global-modal';

type PageLayoutProps = {
    header: React.ReactNode | null;
    content: React.ReactNode | null;
    footer: React.ReactNode | null;
    sider: React.ReactNode | null;
    backgroundImage: string;
}

export const PageLayout = ({
    header,
    content,
    footer,
    sider,
    backgroundImage
}: PageLayoutProps) => (
    <>
        <GlobalModal />

        <Row justify='center' className={cls.wrapper}>
            <Layout className={cls.app} data-test-id='app' style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div style={{ display: 'flex' }}>
                    {sider}
                    <Layout style={{ background: 'transparent' }} className={cls.contentLayout}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {header}
                            {content}
                            {footer}
                        </div>
                    </Layout>
                </div>
            </Layout>
        </Row>
    </>
)