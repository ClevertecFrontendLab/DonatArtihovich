import { MainPage } from "@pages/main-page"
import { PageFooter } from "@widgets/footer"
import { PageHeader } from "@widgets/header"
import { PageSider } from "@widgets/sider"
import { Flex, Layout } from "antd"
import { HashRouter, Route, Routes } from "react-router-dom"
import backgroundImage from '@assets/images/background.png';
import cls from './app.module.scss'

export const App = () => {

    return (
        <HashRouter>
            <Layout style={{ backgroundImage: `url(${backgroundImage})` }} className={cls.app}>
                <Flex style={{ width: '100vw' }}>
                    <PageSider />
                    <Layout style={{ background: 'transparent' }}>
                        <Flex vertical>
                            <PageHeader />
                            <Routes>
                                <Route path='/' element={<MainPage />} />
                            </Routes>
                            <PageFooter />
                        </Flex>
                    </Layout>
                </Flex>
            </Layout>
        </HashRouter>
    )
}