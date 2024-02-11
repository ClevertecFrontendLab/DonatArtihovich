import { DownloadCard } from "@components/download-card"
import { Flex } from "antd"
import { Footer } from "antd/es/layout/layout"
import Link from "antd/es/typography/Link"
import cls from './footer.module.scss'

export const PageFooter = () => {

    return (
        <Footer className={cls.footerWrapper}>
            <Flex justify='space-between' align='flex-end' className={cls.footer}>
                <Link className={cls.footerLink}>Смотреть отзывы</Link>
                <DownloadCard />
            </Flex>
        </Footer>
    )
}