import { Paths } from '@utils/const/paths'
import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

export const AccessPage = () => {
    const [queryParams] = useSearchParams()

    useEffect(() => {
        const accessToken = queryParams.get('accessToken')
        if (accessToken) {
            localStorage.setItem('user', accessToken)
        }
    }, [queryParams])

    return <Navigate to={Paths.MAIN} />
}