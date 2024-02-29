import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedback-card.module.scss'
import defaultAvatar from '@assets/images/avatar.svg'
import { Card, Rate, Typography } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { StarFilled, StarOutlined } from "@ant-design/icons";

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
                        <Rate
                            character={({ index }) => index !== undefined && index + 1 <= feedback.rating
                                ? <StarFilled style={{ color: 'var(--character-light-warning)' }} />
                                : <StarOutlined style={{ color: 'var(--character-light-warning)' }} />}
                            value={4}
                            count={5}
                            disabled
                            className={cls.ratingStars}
                        />
                        <Typography.Text className={cls.feedbackTime}>
                            {feedback.createdAt
                                .split('T')[0]
                                .split('-')
                                .reverse()
                                .join('.')
                            }
                        </Typography.Text>
                    </div>
                    <Typography.Text className={cls.feedbackText}>{feedback.message?.trim()}</Typography.Text>
                </div>
            </div>
        </Card>
    )
}