import { MainPage } from "@pages/main-page"
import { PageFooter } from "@components/footer"
import { PageHeader } from "@components/header"
import { PageSider } from "@components/sider"
import { Layout, Row } from "antd"
import { HashRouter, Route, Routes } from "react-router-dom"
import backgroundImage from '@assets/images/background.png';
import cls from './app.module.scss'
import { useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"

export const App = () => {
    const { width } = useWindowSize()
    const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(!width ? false : width < 702);

    return (
        <HashRouter>
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
                                <Routes>
                                    <Route path='/' element={<MainPage isSiderCollapsed={isSiderCollapsed} />} />
                                </Routes>
                                <PageFooter isSiderCollapsed={isSiderCollapsed} />
                            </div>
                        </Layout>
                    </div>
                </Layout>
            </Row>
        </HashRouter>
    )
}