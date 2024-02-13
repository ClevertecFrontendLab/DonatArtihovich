import { Button, Card, Divider, Typography } from "antd"
import { classNames } from "@utils/lib";
import cls from './download-card.module.scss'
import Link from "antd/es/typography/Link";
import { AndroidFilled, AppleFilled } from "@ant-design/icons";

interface IDownloadCardProps {
    className?: string;
}

export const DownloadCard = ({ className }: IDownloadCardProps) => {
    return (
        <Card className={classNames(className, cls.downloadCard)}>
            <div className={cls.headerWrapper}>
                <Link className={cls.cardHeader}>Скачать на телефон</Link>
                <Typography.Text className={cls.cardSubheader}>Доступно в PRO-тарифе</Typography.Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={cls.buttonsFlex}>
                <Button
                    icon={<AndroidFilled color='black' />}
                    className={cls.downloadButton}
                >
                    <Typography.Text
                        className={cls.downloadButtonText}
                    >
                        Android OS
                    </Typography.Text>
                </Button>
                <Button
                    icon={<AppleFilled color='black' />}
                    className={cls.downloadButton}
                >
                    <Typography.Text
                        className={cls.downloadButtonText}
                    >
                        Apple iOS
                    </Typography.Text>
                </Button>
            </div>
        </Card >
    )
}