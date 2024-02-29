import { DownloadCard } from "@components/download-card"
import { Footer } from "antd/es/layout/layout"
import cls from './main-footer.module.scss'
import classNames from "classnames"
import { useWindowSize } from "@uidotdev/usehooks"
import { Paths } from "@utils/const/paths"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { setUserToken, userSelector } from "@redux/auth/model"
import { useGetFeedbacksQuery } from "@redux/feedbacks/api"
import { FeedbackType } from "@redux/feedbacks/types"
import { setFeedbacks } from "@redux/feedbacks/model"
import { trackPromise } from "react-promise-tracker"
import { history } from '@redux/configure-store'

type PageFooterProps = {
    isSiderCollapsed: boolean;
}

export const MainFooter = ({ isSiderCollapsed }: PageFooterProps) => {
    const { width } = useWindowSize()

    const { token } = useAppSelector(userSelector)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { refetch: refetchFeedbacks } = useGetFeedbacksQuery({})

    const fetchFeedbacks = () => {
        trackPromise(refetchFeedbacks()
            .unwrap()
            .then((data: FeedbackType[]) => {
                console.log(data)
                dispatch(setFeedbacks(data))
                history.push({ pathname: Paths.FEEDBACKS }, { from: Paths.MAIN })
            })
            .catch((err: IError) => {
                console.log('main', err)
                if (err.status === 403 && !token) {
                    const storageToken = localStorage.getItem('user')
                    if (!storageToken) {
                        navigate(Paths.AUTH)
                    } else {
                        dispatch(setUserToken({ token: storageToken }))
                    }
                }
            }))
    }


    if (width)
        return (
            <Footer className={classNames(cls.footerWrapper, isSiderCollapsed && cls.footerStretched)}>
                <div
                    className={cls.footer}
                >
                    {width > 540 && <span className={cls.footerLink} onClick={fetchFeedbacks}>Смотреть отзывы</span>}
                    <DownloadCard />
                    {width <= 540 && <span className={cls.footerLink} onClick={fetchFeedbacks}>Смотреть отзывы</span>}
                </div>
            </Footer>
        )
}