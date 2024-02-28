import { PageLayout } from "@components/page-layout"
import { PageHeader } from "@components/header"
import backgroundImage from "@assets/images/background.png"
import { PageSider } from "@components/sider";
import { FeedbacksContent } from "@components/feedbacks-content";
import { FeedbacksFooter } from "@components/feedbacks-footer";

type FeedbacksPageProps = {
    isSiderCollapsed: boolean;
    setIsSiderCollapsed: (b: boolean) => void;
}

export const FeedbacksPage = ({ isSiderCollapsed, setIsSiderCollapsed }: FeedbacksPageProps) => {
    return (
        <PageLayout
            header={<PageHeader isSiderCollapsed={isSiderCollapsed} />}
            content={<FeedbacksContent />}
            footer={<FeedbacksFooter />}
            sider={<PageSider isCollapsed={isSiderCollapsed} setIsCollapsed={setIsSiderCollapsed} />}
            backgroundImage={backgroundImage}
        />
    )
}