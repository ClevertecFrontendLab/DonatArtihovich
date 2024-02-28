import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedback-card.module.scss'
import defaultAvatar from '@assets/images/avatar.svg'
import { Card, Typography } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";

type FeedbackCardProps = {
    feedback: FeedbackType;
}

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {

    return (
        <Card className={cls.feedbackCard}>
            <div className={cls.cardFlex}>
                <div className={cls.userData}>
                    <div className={cls.avatarImageWrapper}>
                        <Icon
                            component={() => <img src={feedback.imageSrc ?? defaultAvatar}></img>}
                            src={cls.avatarImage}
                        />
                    </div>

                    <Typography.Title className={cls.nameTitle}>{feedback.fullName}</Typography.Title>
                </div>
                <div className={cls.feedbackData}>
                    <div className={cls.feedbackMarkWrapper}>
                        <div></div>
                        <Typography.Text className={cls.feedbackTime}>
                            {feedback.createdAt
                                .split('T')[0]
                                .split('-')
                                .reverse()
                                .join('.')
                            }
                        </Typography.Text>
                    </div>
                    <Typography.Text className={cls.feedbackText}>{feedback.message}</Typography.Text>
                </div>
            </div>
        </Card>
    )
}