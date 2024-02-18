import { MainPage } from "@pages/main-page"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { HistoryRouter } from "redux-first-history/rr6"
import { history } from "@redux/configure-store"
import { AuthPage } from "@pages/auth-page"
import { Paths } from "@utils/const/paths"
import { RegistrationResultPage } from "@pages/success-result"

export const App = () => {
    const { width } = useWindowSize()
    const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(!width ? false : width < 702);

    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path={Paths.MAIN} element={<MainPage isSiderCollapsed={isSiderCollapsed} setIsSiderCollapsed={setIsSiderCollapsed} />} />
                <Route path={Paths.AUTH} element={<AuthPage mode='login' />}></Route>
                <Route path={Paths.REGISTRATION} element={<AuthPage mode="registration" />}></Route>
                <Route path={Paths.REGISTRATION_SUCCESS} element={<RegistrationResultPage success={true} />}></Route>
                <Route path={Paths.REGISTRATION_USER_EXIST_ERROR} element={<RegistrationResultPage success={false} />}></Route>
                <Route path={Paths.REGISTRATION_ERROR} element={<RegistrationResultPage success={false} isUncertainError={true} />}></Route>
            </Routes>
        </HistoryRouter>
    )
}