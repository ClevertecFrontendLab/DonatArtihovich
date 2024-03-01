import { FeedbackCard } from "@components/feedback-card"
import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedbacks-content.module.scss'
import { Content } from "antd/lib/layout/layout"
import { Button } from "antd"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Paths } from "@utils/const/paths"
import { setUserToken, userSelector } from "@redux/auth/model"
import { useGetFeedbacksQuery } from "@redux/feedbacks/api"
import { useRequiredContext } from "@hooks/typed-use-context-hook"
import { ModalContext } from "@processes/modal"
import { ModalErrors } from "@utils/const/modal-errors"
import { AppLoader } from "@components/loader"

type FeedbacksContent = {
    isSiderCollapsed: boolean;
}

export const FeedbacksContent = ({ isSiderCollapsed }: FeedbacksContent) => {
    const { token } = useAppSelector(userSelector)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { setMode } = useRequiredContext(ModalContext)
    const { data: feedbacks, isFetching: isFeedbacksFetching, isError: isFeedbacksError } = useGetFeedbacksQuery({})

    useEffect(() => {
        if (!token) {
            const storageToken = localStorage.getItem('user')
            if (!storageToken) {
                navigate(Paths.AUTH)
            } else {
                dispatch(setUserToken({ token: storageToken }))
            }
        }
    }, [])

    useEffect(() => {
        if (isFeedbacksError) {
            setMode(ModalErrors.GetFeedbacksError)
        }
    }, [isFeedbacksError])

    return (
        <Content>
            <AppLoader isLoader={isFeedbacksFetching} />
            <div className={cls.feedbacksContent}>
                <div className={cls.feedbacksList}>
                    {(feedbacks && feedbacks.length ? feedbacks.slice(-4) : [{
                        id: 'hdfjs',
                        fullName: 'Donat',
                        imageSrc: null,
                        message: 'message '.repeat(210),
                        rating: 4,
                        createdAt: '2023-04-12'
                    }]).map((feedback: FeedbackType) => <FeedbackCard
                        key={feedback.id}
                        feedback={feedback}
                        isSiderCollapsed={isSiderCollapsed}
                    />)}
                </div>
                <div className={cls.buttonsWrapper}>
                    <Button className={cls.writeButton}>Написать отзыв</Button>
                    <Button className={cls.allFeedbacksButton}>Развернуть все отзывы</Button>
                </div>
            </div>

        </Content>
    )
}