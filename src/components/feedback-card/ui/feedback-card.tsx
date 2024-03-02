import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedback-card.module.scss'
import defaultAvatar from '@assets/images/avatar.svg'
import { Card, Typography } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import { classNames } from "@utils/lib";
import { StarRating } from "@components/star-rating";

type FeedbackCardProps = {
    feedback: FeedbackType;
    isSiderCollapsed: boolean;
}

export const FeedbackCard = ({ feedback, isSiderCollapsed }: FeedbackCardProps) => (
    <Card className={classNames(cls.feedbackCard, isSiderCollapsed && cls.stretched)}>
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
                    <StarRating
                        disabled
                        value={feedback.rating}
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
