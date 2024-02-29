import { FeedbackCard } from "@components/feedback-card"
import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedbacks-content.module.scss'
import { Content } from "antd/lib/layout/layout"
import { Button } from "antd"
import { feedbacksSelector } from "@redux/feedbacks/model"
import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Paths } from "@utils/const/paths"

export const FeedbacksContent = () => {
    const { feedbacks } = useAppSelector(feedbacksSelector)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // if (location.state?.from !== Paths.MAIN) navigate(Paths.MAIN)
        console.log(location.state?.from !== Paths.MAIN)
    }, [])

    return (
        <Content>
            <div className={cls.feedbacksContent}>
                <div className={cls.feedbacksList}>
                    {(feedbacks.length ? feedbacks.slice(-4) : [{
                        id: 'hdfjs',
                        fullName: 'Donat',
                        imageSrc: null,
                        message: 'message '.repeat(210),
                        rating: 4,
                        createdAt: '2023-04-12'
                    }]).map((feedback: FeedbackType) => <FeedbackCard key={feedback.id} feedback={feedback} />)}
                </div>
                <div className={cls.buttonsWrapper}>
                    <Button className={cls.writeButton}>Написать отзыв</Button>
                    <Button className={cls.allFeedbacksButton}>Развернуть все отзывы</Button>
                </div>
            </div>

        </Content>
    )
}