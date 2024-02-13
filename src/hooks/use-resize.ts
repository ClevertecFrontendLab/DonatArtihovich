import { useEffect, useState } from "react"

export const useResize = () => {
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        if(width !== window.innerWidth) {
            setWidth(window.innerWidth)
        }
    }, [window.innerWidth])

    return { width }
}