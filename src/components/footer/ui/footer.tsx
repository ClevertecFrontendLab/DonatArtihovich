import { DownloadCard } from "@components/download-card"
import { Footer } from "antd/es/layout/layout"
import Link from "antd/es/typography/Link"
import cls from './footer.module.scss'
import classNames from "classnames"
import { useResize } from "@hooks/use-resize"
import { Row } from "antd"

interface PageFooterProps {
    isSiderCollapsed: boolean;
}

export const PageFooter = ({ isSiderCollapsed }: PageFooterProps) => {
    const { width } = useResize()

    if (width)
        return (
            <Footer className={classNames(cls.footerWrapper, isSiderCollapsed && cls.footerStretched)}>
                <Row
                    className={cls.footer}
                >
                    {width > 540 && <Link className={cls.footerLink}>Смотреть отзывы</Link>}
                    <DownloadCard />
                    {width <= 540 && <Link className={cls.footerLink}>Смотреть отзывы</Link>}
                </Row>
            </Footer>
        )
}