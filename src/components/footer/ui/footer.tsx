import { DownloadCard } from "@components/download-card"
import { Flex } from "antd"
import { Footer } from "antd/es/layout/layout"
import Link from "antd/es/typography/Link"
import cls from './footer.module.scss'
import classNames from "classnames"
import { useWindowSize } from "@uidotdev/usehooks"

interface PageFooterProps {
    isSiderCollapsed: boolean;
}

export const PageFooter = ({ isSiderCollapsed }: PageFooterProps) => {
    const { width } = useWindowSize()

    if (width)
        return (
            <Footer className={classNames(cls.footerWrapper, isSiderCollapsed && cls.footerStretched)}>
                <Flex
                    vertical={width <= 540}
                    justify='space-between'
                    align='flex-end'
                    className={cls.footer}
                >
                    {width > 540 && <Link className={cls.footerLink}>Смотреть отзывы</Link>}
                    <DownloadCard />
                    {width <= 540 && <Link className={cls.footerLink}>Смотреть отзывы</Link>}
                </Flex>
            </Footer>
        )
}