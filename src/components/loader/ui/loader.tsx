import cls from './loader.module.scss'
import Loader from 'react-lottie'
import animationData from '@assets/loader.json'

export const AuthLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={cls.wrapper}>
            <Loader
                options={defaultOptions}
                height={150}
                width={150}
            />
        </div>
    )
}