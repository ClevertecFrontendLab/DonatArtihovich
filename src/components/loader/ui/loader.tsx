import cls from './loader.module.scss'
import Loader from 'lottie-react'
import animationData from '@assets/loader.json'
import { usePromiseTracker } from 'react-promise-tracker'
// import { useLoginUserMutation, useRegisterUserMutation } from '@redux/api/auth-api'

export const AppLoader = () => {
    const { promiseInProgress } = usePromiseTracker()

    if (promiseInProgress)
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