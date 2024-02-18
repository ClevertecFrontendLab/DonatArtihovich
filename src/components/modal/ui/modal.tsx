import { classNames } from '@utils/lib';
import cls from './modal.module.scss'
import modalPageBackground from '@assets/images/modal-page-background.png'

interface ModalPageProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalPage = ({ children, className }: ModalPageProps) => (
    <div className={cls.wrapper} style={{ backgroundImage: `url(${modalPageBackground})` }}>
        <div className={cls.blur}></div>
        <div className={classNames(cls.content, className)}>
            {children}
        </div>
    </div>
)