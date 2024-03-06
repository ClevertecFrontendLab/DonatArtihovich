import { Modal } from "antd";
import cls from './app-modal.module.scss'
import { classNames } from "@utils/lib/class-names";

type AppModalProps = {
    children: React.ReactNode;
    open: boolean;
    title?: string;
    className?: string;
    modalClassName?: string;
}

export const AppModal = ({ children, open, title, className, modalClassName }: AppModalProps) => (
    <Modal
        open={open}
        title={title}
        closable={false}
        className={classNames(cls.modal, modalClassName)}
        wrapClassName={cls.wrapper}
        maskStyle={{
            backgroundColor: 'rgba(121, 156, 212, 0.5)',
            backdropFilter: 'blur(5px)'

        }}
    >
        <div className={className}>
            {children}
        </div>
    </Modal>
)
