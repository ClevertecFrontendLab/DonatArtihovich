import { MainPage } from "@pages/main-page"
import { PageFooter } from "@components/footer"
import { PageHeader } from "@components/header"
import { PageSider } from "@components/sider"
import { Flex, Layout } from "antd"
import { HashRouter, Route, Routes } from "react-router-dom"
import backgroundImage from '@assets/images/background.png';
import cls from './app.module.scss'
import { useState } from "react"

export const App = () => {
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);

    return (
        <HashRouter>
            <Layout style={{ backgroundImage: `url(${backgroundImage})` }} className={cls.app}>
                <Flex style={{ width: '100vw' }}>
                    <PageSider
                        isCollapsed={isSiderCollapsed}
                        setIsCollapsed={setIsSiderCollapsed}
                    />
                    <Layout style={{ background: 'transparent' }}>
                        <Flex vertical>
                            <PageHeader
                                isSiderCollapsed={isSiderCollapsed}
                            />
                            <Routes>
                                <Route path='/' element={<MainPage isSiderCollapsed={isSiderCollapsed} />} />
                            </Routes>
                            <PageFooter isSiderCollapsed={isSiderCollapsed} />
                        </Flex>
                    </Layout>
                </Flex>
            </Layout>
        </HashRouter>
    )
}