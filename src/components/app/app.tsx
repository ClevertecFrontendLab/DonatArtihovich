import { useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { AuthContextProvider } from "@processes/auth"
import { AppRouter } from "@utils/react"
import { AppLoader } from "@components/loader"

export const App = () => {
    const { width } = useWindowSize()
    const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(!width ? false : width < 702);

    return (
        <AuthContextProvider>
            <AppLoader />
            <AppRouter
                isSiderCollapsed={isSiderCollapsed}
                setIsSiderCollapsed={setIsSiderCollapsed}
            />
        </AuthContextProvider >
    )
}