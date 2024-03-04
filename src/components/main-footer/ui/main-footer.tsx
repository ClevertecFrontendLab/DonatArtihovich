import { DownloadCard } from "@components/download-card"
import { Footer } from "antd/es/layout/layout"
import cls from './main-footer.module.scss'
import classNames from "classnames"
import { useWindowSize } from "@uidotdev/usehooks"
import { Paths } from "@utils/const/paths"
import { Link } from "react-router-dom"

type PageFooterProps = {
    isSiderCollapsed: boolean;
}

export const MainFooter = ({ isSiderCollapsed }: PageFooterProps) => {
    const { width } = useWindowSize()

    if (width)
        return (
            <Footer className={classNames(cls.footerWrapper, isSiderCollapsed && cls.footerStretched)}>
                <div className={cls.footer}>
                    {width > 540 && <Link to={Paths.FEEDBACKS} className={cls.footerLink} data-test-id='see-reviews'>Смотреть отзывы</Link>}
                    <DownloadCard />
                    {width <= 540 && <Link to={Paths.FEEDBACKS} className={cls.footerLink} data-test-id='see-reviews'>Смотреть отзывы</Link>}
                </div>
            </Footer>
        )
}