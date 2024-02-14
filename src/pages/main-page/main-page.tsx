import { MainContent } from '@components/main-content';

interface MainPageProps {
    isSiderCollapsed: boolean;
}

export const MainPage = ({ isSiderCollapsed }: MainPageProps) => {

    return (
        <MainContent isSiderCollapsed={isSiderCollapsed} />
    )
};
