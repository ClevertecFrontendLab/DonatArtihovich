import { Button, Card, Divider, Flex, Typography } from "antd"
import { classNames } from "@utils/lib";
import cls from './action-card.module.scss'
import { useWindowSize } from "@uidotdev/usehooks";

interface IActionCardProps {
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
}: IActionCardProps) => {

    const { width } = useWindowSize()

    return (
        <Card className={classNames(className, cls.actionCard, isStretched && cls.cardStretched)} bodyStyle={{ padding: 0 }}>
            <Flex vertical align='center' justify={width && width < 1200 ? 'space-between' : 'center'} className={cls.cardFlex}>
                <Typography.Text className={cls.cardTitle}>{title}</Typography.Text>
                <Divider className={cls.cardDivider} />
                <Button icon={buttonIcon} className={cls.cardButton}>
                    <Typography.Text className={cls.cardButtonTitle}>
                        {buttonTitle}
                    </Typography.Text>
                </Button>
            </Flex>
        </Card >
    )
}