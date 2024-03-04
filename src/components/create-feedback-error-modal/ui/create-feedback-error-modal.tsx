import { ResultModal } from "@components/result-modal";
import cls from './create-feedback-error-modal.module.scss'
import { Button } from "antd";
import { useRequiredContext } from "@hooks/typed-use-context-hook";
import { ModalContext } from "@processes/modal";
import ModalModes from "@utils/const/modal-modes";

export const CreateFeedbackErrorModal = () => {
    const { setMode } = useRequiredContext(ModalContext)

    const onRightButtonClick = () => {
        setMode(null)
    }

    const onLeftButtonClick = () => {
        setMode(ModalModes.CreateFeedback)
    }

    return (

        <ResultModal
            mode={ModalModes.CreateFeedbackError}
            buttons={
                <div className={cls.buttonsWrapper}>
                    <Button className={cls.leftButton} onClick={onLeftButtonClick} data-test-id='write-review-not-saved-modal'>Написать отзыв</Button>
                    <Button className={cls.rightButton} onClick={onRightButtonClick}>Закрыть</Button>
                </div>
            }
        />
    )
}