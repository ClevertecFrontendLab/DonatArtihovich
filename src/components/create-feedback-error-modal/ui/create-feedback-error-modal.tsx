import { ResultModal } from "@components/result-modal";
import { ModalErrors } from "@utils/const/modal-errors";
import cls from './create-feedback-error-modal.module.scss'
import { Button } from "antd";
import { useRequiredContext } from "@hooks/typed-use-context-hook";
import { ModalContext } from "@processes/modal";

export const CreateFeedbackErrorModal = () => {
    const { setMode } = useRequiredContext(ModalContext)

    const onRightButtonClick = () => {
        setMode(null)
    }

    const onLeftButtonClick = () => {
        setMode(ModalErrors.CreateFeedback)
    }

    return (
        <ResultModal
            mode={ModalErrors.CreateFeedbackError}
            buttons={
                <div className={cls.buttonsWrapper}>
                    <Button className={cls.leftButton} onClick={onLeftButtonClick}>Написать отзыв</Button>
                    <Button className={cls.rightButton} onClick={onRightButtonClick}>Закрыть</Button>
                </div>
            }
        />
    )
}