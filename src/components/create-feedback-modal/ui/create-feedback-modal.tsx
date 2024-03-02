import { Button, Divider, Modal, Typography } from 'antd'
import cls from './create-feedback-modal.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { StarRating } from '@components/star-rating'
import { useEffect, useState } from 'react'
import { useRequiredContext } from '@hooks/typed-use-context-hook'
import { ModalContext } from '@processes/modal'
import { useCreateFeedbackMutation } from '@redux/feedbacks/api/feedbacks-api'
import { trackPromise } from 'react-promise-tracker'
import { ModalErrors } from '@utils/const/modal-errors'

export const CreateFeedbackModal = () => {
    const [rating, setRating] = useState<number>(5)
    const [message, setMessage] = useState<string>('')
    const { setMode } = useRequiredContext(ModalContext)
    const [createFeedback,
        {
            isSuccess: isCreateFeedbackSuccess,
            isError: isCreateFeedbackError
        }] = useCreateFeedbackMutation()

    const onCreateFeedbackClick = () => {
        trackPromise(createFeedback({ rating, message }))
    }

    useEffect(() => {
        if (isCreateFeedbackError) {
            console.log('error')
        }

        if (isCreateFeedbackSuccess) {
            setMode(ModalErrors.CreateFeedbackSuccess);
        }

    }, [isCreateFeedbackError, isCreateFeedbackSuccess])

    return (
        <div className={cls.wrapper}>
            <div className={cls.headerWrapper}>
                <Typography.Title className={cls.headerTitle}>Ваш отзыв</Typography.Title>
                <Button
                    className={cls.closeButton}
                    icon={<CloseOutlined />}
                    onClick={() => setMode(null)}
                />
            </div>
            <Divider className={cls.divider} />
            <div className={cls.form}>
                <StarRating
                    disabled={false}
                    value={rating}
                    onChange={setRating}
                    className={cls.starRating}
                />
                <TextArea
                    placeholder='Autosize height based on content lines'
                    className={cls.textArea}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
            </div>
            <Divider className={cls.divider} />
            <div className={cls.buttonWrapper}>
                <Button className={cls.postButton} onClick={onCreateFeedbackClick}>Опубликовать</Button>
            </div>
        </div>
    )
}