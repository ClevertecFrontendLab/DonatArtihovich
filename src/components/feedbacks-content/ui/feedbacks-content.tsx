import { FeedbackCard } from "@components/feedback-card"
import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedbacks-content.module.scss'
import { Content } from "antd/lib/layout/layout"
import { Button, Typography } from "antd"
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
import { useWindowSize } from "@uidotdev/usehooks"
import { classNames } from "@utils/lib"

type FeedbacksContent = {
    isSiderCollapsed: boolean;
}

export const FeedbacksContent = ({ isSiderCollapsed }: FeedbacksContent) => {
    const { token } = useAppSelector(userSelector)
    const { width } = useWindowSize()
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

    const onWriteButtonClick = () => {
        setMode(ModalErrors.CreateFeedbackError)
    }

    return (
        <Content>
            <AppLoader isLoader={isFeedbacksFetching} />
            {feedbacks && <div className={classNames(
                cls.feedbacksContent,
                !feedbacks.length && cls.noFeedbacks,
                isSiderCollapsed && cls.stretched
            )}>
                {feedbacks.length ?
                    <>
                        <div className={cls.feedbacksList}>
                            {feedbacks.slice(-4).map((feedback: FeedbackType) => <FeedbackCard
                                key={feedback.id}
                                feedback={feedback}
                                isSiderCollapsed={isSiderCollapsed}
                            />)}
                        </div>
                        <div className={cls.buttonsWrapper}>
                            <Button className={cls.writeButton} onClick={onWriteButtonClick}>Написать отзыв</Button>
                            <Button className={cls.allFeedbacksButton}>Развернуть все отзывы</Button>
                        </div>
                    </>
                    : <>

                        <div className={cls.NoFeedbacksContent}>
                            <div className={cls.NoFeedbacksModal}>
                                <Typography.Title className={cls.NoFeedbacksTitle}>Оставьте свой отзыв первым</Typography.Title>
                                <Typography.Text className={cls.NoFeedbacksText}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.<br />Поделитесь своим мнением и {width && width < 600 && <br />}опытом с другими пользователями,<br /> и помогите им сделать правильный выбор.</Typography.Text>
                            </div>
                            <Button
                                className={cls.writeButton}
                                onClick={onWriteButtonClick}
                            >Написать отзыв</Button>
                        </div>
                    </>}
            </div>
            }
        </Content>
    )
}