import { FeedbackCard } from "@components/feedback-card"
import { FeedbackType } from "@redux/feedbacks/types"
import cls from './feedbacks-content.module.scss'
import { Content } from "antd/lib/layout/layout"
import { Button, Typography } from "antd"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Paths } from "@utils/const/paths"
import { setUserToken, userSelector } from "@redux/auth/model"
import { useGetFeedbacksQuery } from "@redux/feedbacks/api"
import { useRequiredContext } from "@hooks/typed-use-context-hook"
import { ModalContext } from "@processes/modal"
import { AppLoader } from "@components/loader"
import { useWindowSize } from "@uidotdev/usehooks"
import { classNames } from "@utils/lib"
import ModalModes from "@utils/const/modal-modes"
import { feedbacksSelector, setFeedbacks } from "@redux/feedbacks/model"

type FeedbacksContent = {
    isSiderCollapsed: boolean;
}

export const FeedbacksContent = ({ isSiderCollapsed }: FeedbacksContent) => {
    const { token } = useAppSelector(userSelector)
    const { width } = useWindowSize()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { setMode } = useRequiredContext(ModalContext)
    const {
        data: feedbacksData,
        isFetching: isFeedbacksFetching,
        isSuccess: isFeedbacksSuccess,
        isError: isFeedbacksError,
    } = useGetFeedbacksQuery({})
    const [showAll, setShowAll] = useState<boolean>(false)
    const { feedbacks } = useAppSelector(feedbacksSelector)

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
            setMode(ModalModes.GetFeedbacksError)
        }

        if (isFeedbacksSuccess) {
            dispatch(setFeedbacks(feedbacksData))
        }
    }, [isFeedbacksError, isFeedbacksSuccess])

    const onWriteButtonClick = () => {
        setMode(ModalModes.CreateFeedback)
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
                            {(showAll ? feedbacks : feedbacks.slice(-4)).map((feedback: FeedbackType) => <FeedbackCard
                                key={feedback.id}
                                feedback={feedback}
                                isSiderCollapsed={isSiderCollapsed}
                            />).reverse()}
                        </div>
                        <div className={cls.buttonsWrapper}>
                            <Button className={cls.writeButton} onClick={onWriteButtonClick} data-test-id='write-review'>Написать отзыв</Button>
                            <Button
                                className={cls.allFeedbacksButton}
                                onClick={() => setShowAll(!showAll)}
                                data-test-id='all-reviews-button'
                            >{showAll ? 'Свернуть' : 'Развернуть'} все отзывы</Button>
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
                                data-test-id='write-review'
                            >Написать отзыв</Button>
                        </div>
                    </>}
            </div>
            }
        </Content>
    )
}