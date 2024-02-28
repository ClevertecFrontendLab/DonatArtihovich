import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedback-card.module.scss'
import { Card } from "antd";

type FeedbackCardProps = {
    feedback: FeedbackType;
}

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {

    return (
        <Card className={cls.feedbackCard}>
            {feedback.message}
        </Card>
    )
}