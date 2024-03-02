import { useRequiredContext } from '@hooks/typed-use-context-hook'
import cls from './global-modal.module.scss'
import { ModalContext } from '@processes/modal'
import { ResultModal } from '@components/result-modal'
import { useEffect } from 'react'
import { ModalErrors } from '@utils/const/modal-errors'
import { classNames } from '@utils/lib'
import { CreateFeedbackModal } from '@components/create-feedback-modal'
import { CreateFeedbackErrorModal } from '@components/create-feedback-error-modal'

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

    return !mode ? mode : (
        <div className={cls.wrapper}>
            {mode === ModalErrors.CreateFeedback
                ? <CreateFeedbackModal />
                : <div className={classNames(
                    cls.modalBody,
                    mode === ModalErrors.GetFeedbacksError && cls.getFeedbacksError,
                    (mode === ModalErrors.ChangePasswordSuccess || mode === ModalErrors.CreateFeedbackError) && cls.wideMode,
                )}>
                    {mode === ModalErrors.CreateFeedbackError
                        ? <CreateFeedbackErrorModal />
                        : <ResultModal mode={mode} />}
                </div>
            }
        </div>
    )
}