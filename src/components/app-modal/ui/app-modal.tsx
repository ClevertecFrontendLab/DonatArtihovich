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

export const AppModal = ({ children, open, title, className, modalClassName }: AppModalProps) => {
    return (
        <Modal
            open={open}
            onOk={() => console.log('ok')}
            title={title}
            closable={false}
            className={classNames(cls.modal, modalClassName)}
            wrapClassName={cls.wrapper}
            mask
        >
            <div className={className}>
                {children}
            </div>
        </Modal>
    )
}