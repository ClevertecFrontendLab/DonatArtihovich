import { MainPage } from "@pages/main-page"
import { PageFooter } from "@components/footer"
import { PageHeader } from "@components/header"
import { PageSider } from "@components/sider"
import { Flex, Layout } from "antd"
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
            <Layout style={{ backgroundImage: `url(${backgroundImage})` }} className={cls.app} data-test-id='app'>
                <Flex style={{ width: '100vw' }}>
                    <PageSider
                        isCollapsed={isSiderCollapsed}
                        setIsCollapsed={setIsSiderCollapsed}
                    />
                    <Layout style={{ background: 'transparent' }} className={cls.contentLayout}>
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