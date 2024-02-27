import cls from './loader.module.scss'
import Loader from 'lottie-react'
import animationData from '@assets/loader.json'

export const AppLoader = () => {
    return (
        <div className={cls.wrapper}>
            <Loader
                animationData={animationData}
                height={150}
                width={150}
                style={{ width: '150px', height: '150px' }}
                loop={true}
                data-test-id='loader'
            />
        </div>
    )
}