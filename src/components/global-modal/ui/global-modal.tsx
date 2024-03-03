import { useRequiredContext } from '@hooks/typed-use-context-hook'
import cls from './global-modal.module.scss'
import { ModalContext } from '@processes/modal'
// import { ResultModal } from '@components/result-modal'
import { useEffect } from 'react'
// import { classNames } from '@utils/lib'
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
            {mode === ModalModes.GetFeedbacksError &&
                <AppModal open={mode === ModalModes.GetFeedbacksError}>
                    <div className={cls.resultModalBody}>
                        <ResultModal mode={ModalModes.GetFeedbacksError} />
                    </div>
                </AppModal>
            }
        </>
    )


    // return !mode ? mode : (
    //     <div className={cls.wrapper}>
    //         {mode === ModalModes.CreateFeedback
    //             ? <CreateFeedbackModal />
    //             : <div className={classNames(
    //                 cls.modalBody,
    //                 mode === ModalModes.GetFeedbacksError && cls.getFeedbacksError,
    //                 (mode === ModalModes.CreateFeedbackError) && cls.wideMode,
    //             )}>
    //                 {mode === ModalModes.CreateFeedbackError
    //                     ? <CreateFeedbackErrorModal />
    //                     : <ResultModal mode={mode} />}
    //             </div>
    //         }
    //     </div>
    // )
}