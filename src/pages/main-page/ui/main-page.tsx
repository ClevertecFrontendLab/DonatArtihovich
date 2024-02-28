import { PageFooter } from '@components/footer';
import { MainContent } from '@components/main-content';
import { PageSider } from '@components/sider';
import { PageHeader } from '@components/header';
import backgroundImage from '@assets/images/background.png';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@utils/const/paths';
import { PageLayout } from '@components/page-layout';

type MainPageProps = {
    isSiderCollapsed: boolean;
    setIsSiderCollapsed: (b: boolean) => void;
}

export const MainPage = ({ isSiderCollapsed, setIsSiderCollapsed }: MainPageProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!localStorage.getItem('user') && !location.state) {
            navigate(Paths.AUTH)
        }
    }, [])

    return (
        <PageLayout
            header={<PageHeader isSiderCollapsed={isSiderCollapsed} />}
            content={<MainContent isSiderCollapsed={isSiderCollapsed} />}
            footer={<PageFooter isSiderCollapsed={isSiderCollapsed} />}
            sider={<PageSider isCollapsed={isSiderCollapsed} setIsCollapsed={setIsSiderCollapsed} />}
            backgroundImage={backgroundImage}
        />
    )
};
