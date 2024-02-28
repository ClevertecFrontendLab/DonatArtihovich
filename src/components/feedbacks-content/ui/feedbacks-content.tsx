import { FeedbackCard } from "@components/feedback-card"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { setUserToken, userSelector } from "@redux/auth/model"
import { useGetFeedbacksQuery } from "@redux/feedbacks/api"
import { FeedbackType } from "@redux/feedbacks/types"
import { Paths } from "@utils/const/paths"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const FeedbacksContent = () => {
    const { token } = useAppSelector(userSelector)
    const { data, isError, error } = useGetFeedbacksQuery({})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isError) {
            const err = error as IError
            if (err.status === 403 && !token) {
                const storageToken = localStorage.getItem('user')
                if (!storageToken) {
                    navigate(Paths.AUTH)
                } else {
                    dispatch(setUserToken({ token: storageToken }))
                }
            }
        }
    }, [isError, error])

    return (
        <>
            {data?.map((feedback: FeedbackType) => <FeedbackCard feedback={feedback} />)}
        </>
    )
}