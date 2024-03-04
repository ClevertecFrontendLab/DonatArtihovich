import { useAppDispatch } from '@hooks/typed-react-redux-hooks'
import { useRequiredContext } from '@hooks/typed-use-context-hook'
import { AuthContext } from '@processes/auth'
import { setUserToken } from '@redux/auth/model'
import { Paths } from '@utils/const/paths'
import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

export const AccessPage = () => {
    const [queryParams] = useSearchParams()
    const dispatch = useAppDispatch()
    const { isRemembered } = useRequiredContext(AuthContext)
    const accessToken = queryParams.get('accessToken')

    useEffect(() => {
        if (accessToken) {
            if (isRemembered) localStorage.setItem('user', accessToken)
            else localStorage.clear()

            dispatch(setUserToken({ token: accessToken }))
        }
    }, [accessToken])

    return <Navigate to={Paths.MAIN} />
}