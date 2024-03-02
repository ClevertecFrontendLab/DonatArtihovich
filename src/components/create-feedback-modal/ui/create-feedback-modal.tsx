import { Button, Divider, Typography } from 'antd'
import cls from './create-feedback-modal.module.scss'
import { CloseOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { StarRating } from '@components/star-rating'
import { useState } from 'react'
import { useRequiredContext } from '@hooks/typed-use-context-hook'
import { ModalContext } from '@processes/modal'

export const CreateFeedbackModal = () => {
    const [rating, setRating] = useState<number>(5)
    const { setMode } = useRequiredContext(ModalContext)

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
                <TextArea placeholder='Autosize height based on content lines' className={cls.textArea} />
            </div>
            <Divider className={cls.divider} />
            <div className={cls.buttonWrapper}>
                <Button className={cls.postButton}>Опубликовать</Button>
            </div>
        </div>
    )
}