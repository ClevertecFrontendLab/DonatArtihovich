import { FeedbackCard } from "@components/feedback-card"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { setUserToken, userSelector } from "@redux/auth/model"
import { useGetFeedbacksQuery } from "@redux/feedbacks/api"
import { FeedbackType } from "@redux/feedbacks/types"
import { Paths } from "@utils/const/paths"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import cls from './feedbacks-content.module.scss'
import { Content } from "antd/lib/layout/layout"
import { Button } from "antd"

export const FeedbacksContent = () => {
    const { token } = useAppSelector(userSelector)
    const { data, isError, error } = useGetFeedbacksQuery({})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isError) {
            const err = error as IError
            if (err.status === 403 && !token) {
                const storageToken = localStorage.getItem('user')
                if (!storageToken) {
                    navigate(Paths.AUTH)
                } else {
                    dispatch(setUserToken({ token: storageToken }))
                }
            }
        }
    }, [isError, error])

    return (
        <Content>
            <div className={cls.feedbacksContent}>
                <div className={cls.feedbacksList}>
                    {(data ? data.slice(-4) : [{
                        fullName: 'Donat',
                        imageSrc: null,
                        message: 'message '.repeat(210),
                        rating: 4,
                        createdAt: '2023-04-12'
                    }]).map((feedback: FeedbackType) => <FeedbackCard feedback={feedback} />)}
                </div>
                <div className={cls.buttonsWrapper}>
                    <Button className={cls.writeButton}>Написать отзыв</Button>
                    <Button className={cls.allFeedbacksButton}>Развернуть все отзывы</Button>
                </div>
            </div>

        </Content>
    )
}