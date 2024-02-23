import { MainPage } from "@pages/main-page"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { HistoryRouter } from "redux-first-history/rr6"
import { history } from "@redux/configure-store"
import { AuthPage } from "@pages/auth-page"
import { Paths } from "@utils/const/paths"
import { ModalResultPage } from "@pages/auth-result"
import { ModalErrors } from "@utils/const/modal-errors"

export const App = () => {
    const { width } = useWindowSize()
    const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(!width ? false : width < 702);

    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path={Paths.MAIN} element={<MainPage isSiderCollapsed={isSiderCollapsed} setIsSiderCollapsed={setIsSiderCollapsed} />} />
                <Route path={Paths.AUTH} element={<AuthPage mode='login' />}></Route>
                <Route path={Paths.REGISTRATION} element={<AuthPage mode="registration" />}></Route>
                <Route path={Paths.REGISTRATION_SUCCESS} element={<ModalResultPage mode={ModalErrors.RegistrationSuccess} />}></Route>
                <Route path={Paths.REGISTRATION_USER_EXIST_ERROR} element={<ModalResultPage mode={ModalErrors.RegistrationUserExistError} />}></Route>
                <Route path={Paths.REGISTRATION_ERROR} element={<ModalResultPage mode={ModalErrors.RegistrationError} />}></Route>
                <Route path={Paths.LOGIN_ERROR} element={<ModalResultPage mode={ModalErrors.LoginError} />}></Route>
            </Routes>
        </HistoryRouter>
    )
}