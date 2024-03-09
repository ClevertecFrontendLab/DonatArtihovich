import { MainFooter } from '@components/main-footer';
import { MainContent } from '@components/main-content';
import { PageSider } from '@components/sider';
import { PageHeader } from '@components/header';
import backgroundImage from '@assets/images/background.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@utils/const/paths';
import { PageLayout } from '@components/page-layout';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setUserToken, userSelector } from '@redux/auth/model';
import { MainContent as MainContents } from '@utils/const/main-content';
import { CalendarContent } from '@components/calendar-content';

type MainPageProps = {
    isSiderCollapsed: boolean;
    setIsSiderCollapsed: (b: boolean) => void;
}

export const MainPage = ({ isSiderCollapsed, setIsSiderCollapsed }: MainPageProps) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { token } = useAppSelector(userSelector)
    const [content, setContent] = useState<MainContents>(MainContents.Main)

    useEffect(() => {
        const storageToken = localStorage.getItem('user');
        if (storageToken) {
            dispatch(setUserToken({ token: storageToken }))
        } else if (!location.state && !token || !token) {
            console.log(location.state)
            navigate(Paths.AUTH)
        }
    }, [])

    return (
        <PageLayout
            header={<PageHeader isSiderCollapsed={isSiderCollapsed} />}
            content={
                content === MainContents.Main
                    ? <MainContent isSiderCollapsed={isSiderCollapsed} />
                    : <CalendarContent isSiderCollapsed={isSiderCollapsed} />
            }
            footer={
                content === MainContents.Main
                    ? <MainFooter isSiderCollapsed={isSiderCollapsed} />
                    : <></>}
            sider={<PageSider
                isCollapsed={isSiderCollapsed}
                setIsCollapsed={setIsSiderCollapsed}
                setContent={setContent}
                content={content}
            />}
            backgroundImage={backgroundImage}
        />
    )
};
