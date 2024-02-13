import { DownloadCard } from "@components/download-card"
import { Flex } from "antd"
import { Footer } from "antd/es/layout/layout"
import Link from "antd/es/typography/Link"
import cls from './footer.module.scss'
import classNames from "classnames"

interface PageFooterProps {
    isSiderCollapsed: boolean;
}

export const PageFooter = ({ isSiderCollapsed }: PageFooterProps) => {

    return (
        <Footer className={classNames(cls.footerWrapper, isSiderCollapsed && cls.footerStretched)}>
            <Flex justify='space-between' align='flex-end' className={cls.footer}>
                <Link className={cls.footerLink}>Смотреть отзывы</Link>
                <DownloadCard />
            </Flex>
        </Footer>
    )
}