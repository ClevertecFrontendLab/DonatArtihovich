import { Button, Card, Divider, Typography } from "antd"
import { classNames } from "@utils/lib";
import cls from './action-card.module.scss'

type ActionCardProps = {
    className?: string;
    title: string;
    buttonTitle: string;
    buttonIcon: React.ReactNode;
    isStretched?: boolean;
}

export const ActionCard = ({
    className,
    title,
    buttonTitle,
    buttonIcon,
    isStretched = false
}: ActionCardProps) => (
    <Card className={classNames(className, cls.actionCard, isStretched && cls.cardStretched)}>
        <div className={cls.cardFlex}>
            <Typography.Text className={cls.cardTitle}>{title}</Typography.Text>
            <Divider className={cls.cardDivider} />
            <Button icon={buttonIcon} className={cls.cardButton}>
                <Typography.Text className={cls.cardButtonTitle}>
                    {buttonTitle}
                </Typography.Text>
            </Button>
        </div>
    </Card>
)