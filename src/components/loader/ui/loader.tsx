import cls from './loader.module.scss'
import Loader from 'lottie-react'
import animationData from '@assets/loader.json'

export const AuthLoader = () => (
    <div className={cls.wrapper} data-test-id='loader'>
        <Loader
            animationData={animationData}
            height={150}
            width={150}
            style={{ width: '150px', height: '150px' }}
            loop={true}
        />
    </div>
)