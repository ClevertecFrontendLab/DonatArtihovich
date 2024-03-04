import cls from './loader.module.scss'
import Loader from 'lottie-react'
import animationData from '@assets/loader.json'
import { usePromiseTracker } from 'react-promise-tracker'
import { classNames } from '@utils/lib'
import { useEffect } from 'react'

type AppLoaderProps = {
    isLoader?: boolean;
}
export const AppLoader = ({ isLoader = false }: AppLoaderProps) => {
    const { promiseInProgress } = usePromiseTracker()

    useEffect(() => {
        if (promiseInProgress || isLoader) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [promiseInProgress, isLoader])

    return (
        <div className={classNames(cls.wrapper, (!promiseInProgress && !isLoader) && cls.hidden)}>
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