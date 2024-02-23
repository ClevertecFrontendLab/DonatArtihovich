import { MainPage } from "@pages/main-page"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { HistoryRouter } from "redux-first-history/rr6"
import { history } from "@redux/configure-store"
import { AuthPage } from "@pages/auth-page"
import { Paths } from "@utils/const/paths"
import { ResultModalPage } from "@pages/result-modal"
import { ModalErrors } from "@utils/const/modal-errors"
import { ConfirmEmailPage } from "@pages/confirm-email"

export const App = () => {
    const { width } = useWindowSize()
    const [isSiderCollapsed, setIsSiderCollapsed] = useState<boolean>(!width ? false : width < 702);

    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path={Paths.MAIN} element={<MainPage isSiderCollapsed={isSiderCollapsed} setIsSiderCollapsed={setIsSiderCollapsed} />} />
                <Route path={Paths.AUTH} element={<AuthPage mode='login' />}></Route>
                <Route path={Paths.REGISTRATION} element={<AuthPage mode="registration" />}></Route>
                <Route path={Paths.REGISTRATION_SUCCESS} element={<ResultModalPage mode={ModalErrors.RegistrationSuccess} />}></Route>
                <Route path={Paths.REGISTRATION_USER_EXIST_ERROR} element={<ResultModalPage mode={ModalErrors.RegistrationUserExistError} />}></Route>
                <Route path={Paths.REGISTRATION_ERROR} element={<ResultModalPage mode={ModalErrors.RegistrationError} />}></Route>
                <Route path={Paths.LOGIN_ERROR} element={<ResultModalPage mode={ModalErrors.LoginError} />}></Route>
                <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmailPage />}></Route>
                <Route path={Paths.ERROR_CHECK_EMAIL_NO_EXIST} element={<ResultModalPage mode={ModalErrors.CheckEmailNoExistError} />}></Route>
                <Route path={Paths.ERROR_CHECK_EMAIL} element={<ResultModalPage mode={ModalErrors.CheckEmailError} />}></Route>
            </Routes>
        </HistoryRouter>
    )
}