import { useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { AuthContextProvider } from "@processes/auth"
import { AppRouter } from "@utils/react"

export const App = () => {
    const { width } = useWindowSize()
    const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(!width ? false : width < 702);

    return (
        <AuthContextProvider>
            <AppRouter
                isSiderCollapsed={isSiderCollapsed}
                setIsSiderCollapsed={setIsSiderCollapsed}
            />
        </AuthContextProvider >
    )
}