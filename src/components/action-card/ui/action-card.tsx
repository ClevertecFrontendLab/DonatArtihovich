import { Button, Card, Divider, Flex, Typography } from "antd"
import { classNames } from "@utils/lib";
import cls from './action-card.module.scss'

interface IActionCardProps {
    className?: string;
    title: string;
    buttonTitle: string;
    buttonIcon: React.ReactNode
}

export const ActionCard = ({
    className,
    title,
    buttonTitle,
    buttonIcon
}: IActionCardProps) => {

    return (
        <Card className={classNames(className, cls.actionCard)} bodyStyle={{ padding: 0 }}>
            <Flex vertical align='center'>
                <Typography.Text className={cls.cardTitle}>{title}</Typography.Text>
                <Divider className={cls.cardDivider} />
                <Button icon={buttonIcon} className={cls.cardButton}>
                    <Typography.Text className={cls.cardButtonTitle}>
                        {buttonTitle}
                    </Typography.Text>
                </Button>
            </Flex>
        </Card>
    )
}