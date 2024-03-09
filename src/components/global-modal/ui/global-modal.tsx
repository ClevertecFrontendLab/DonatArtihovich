import { useRequiredContext } from '@hooks/typed-use-context-hook'
import cls from './global-modal.module.scss'
import { ModalContext } from '@processes/modal'
import { useEffect } from 'react'
import { CreateFeedbackModal } from '@components/create-feedback-modal'
import ModalModes from '@utils/const/modal-modes'
import { AppModal } from '@components/app-modal'
import { ResultModal } from '@components/result-modal'
import { CreateFeedbackErrorModal } from '@components/create-feedback-error-modal'
import { classNames } from '@utils/lib'

export const GlobalModal = () => {
    const { mode } = useRequiredContext(ModalContext)

    useEffect(() => {
        if (mode) {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [mode])

    return (
        <>
            {mode === ModalModes.CreateFeedback && <CreateFeedbackModal />}
            {mode === ModalModes.CreateFeedbackSuccess &&
                <AppModal open={mode === ModalModes.CreateFeedbackSuccess}>
                    <div className={classNames(cls.resultModalBody, cls.wideMode)}>
                        <ResultModal mode={ModalModes.CreateFeedbackSuccess} />
                    </div>
                </AppModal>}
            {mode === ModalModes.CreateFeedbackError &&
                <AppModal open={mode === ModalModes.CreateFeedbackError}>
                    <div className={classNames(cls.resultModalBody, cls.wideMode)}>
                        <CreateFeedbackErrorModal />
                    </div>
                </AppModal>}
            {(mode === ModalModes.GetFeedbacksError || mode === ModalModes.GetTrainingsError) &&
                <AppModal open={mode === ModalModes.GetFeedbacksError || mode === ModalModes.GetTrainingsError}>
                    <div className={classNames(cls.resultModalBody, cls.wideBody)}>
                        <ResultModal mode={ModalModes.GetFeedbacksError} />
                    </div>
                </AppModal>
            }
        </>
    )
}