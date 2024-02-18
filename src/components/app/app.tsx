import { MainPage } from "@pages/main-page"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { HistoryRouter } from "redux-first-history/rr6"
import { history } from "@redux/configure-store"
import { AuthModal } from "@components/auth-modal/ui/auth-modal"
import { Paths } from "@utils/const/paths"

export const App = () => {
    const { width } = useWindowSize()
    const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(!width ? false : width < 702);

    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path={Paths.MAIN} element={<MainPage isSiderCollapsed={isSiderCollapsed} setIsSiderCollapsed={setIsSiderCollapsed} />} />
                <Route path={Paths.AUTH} element={<AuthModal />}></Route>
            </Routes>
        </HistoryRouter>
    )
}