import { Layout, Row } from 'antd';
import cls from './page-layout.module.scss'

type PageLayoutProps = {
    header: React.ReactNode;
    content: React.ReactNode;
    footer: React.ReactNode;
    sider: React.ReactNode;
    backgroundImage: string;
}

export const PageLayout = ({
    header,
    content,
    footer,
    sider,
    backgroundImage
}: PageLayoutProps) => (
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
)