import { AuthPage } from "@pages/auth-page";
import { ChangePasswordPage } from "@pages/change-password";
import { ConfirmEmailPage } from "@pages/confirm-email";
import { FeedbacksPage } from "@pages/feedbacks/ui/feedbacks-page";
import { MainPage } from "@pages/main-page";
import { ResultModalPage } from "@pages/result-modal";
import { history } from "@redux/configure-store";
import { ModalErrors } from "@utils/const/modal-errors";
import { Paths } from "@utils/const/paths";
import { Navigate, Route, Routes } from "react-router-dom";
import { HistoryRouter } from "redux-first-history/rr6";

type AppRouterProps = {
    isSiderCollapsed: boolean,
    setIsSiderCollapsed: (b: boolean) => void
}

export const AppRouter = ({ isSiderCollapsed, setIsSiderCollapsed }: AppRouterProps) => (
    <HistoryRouter history={history}>
        <Routes>
            <Route path={Paths.MAIN} element={<MainPage isSiderCollapsed={isSiderCollapsed} setIsSiderCollapsed={setIsSiderCollapsed} />} />
            <Route path={Paths.AUTH} element={<AuthPage mode='login' />} />
            <Route path={Paths.REGISTRATION} element={<AuthPage mode="registration" />} />
            <Route path={Paths.REGISTRATION_SUCCESS} element={<ResultModalPage mode={ModalErrors.RegistrationSuccess} />} />
            <Route path={Paths.REGISTRATION_USER_EXIST_ERROR} element={<ResultModalPage mode={ModalErrors.RegistrationUserExistError} />} />
            <Route path={Paths.REGISTRATION_ERROR} element={<ResultModalPage mode={ModalErrors.RegistrationError} />} />
            <Route path={Paths.LOGIN_ERROR} element={<ResultModalPage mode={ModalErrors.LoginError} />} />
            <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
            <Route path={Paths.ERROR_CHECK_EMAIL_NO_EXIST} element={<ResultModalPage mode={ModalErrors.CheckEmailNoExistError} />} />
            <Route path={Paths.ERROR_CHECK_EMAIL} element={<ResultModalPage mode={ModalErrors.CheckEmailError} />} />
            <Route path={Paths.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
            <Route path={Paths.CHANGE_PASSWORD_SUCCESS} element={<ResultModalPage mode={ModalErrors.ChangePasswordSuccess} />} />
            <Route path={Paths.CHANGE_PASSWORD_ERROR} element={<ResultModalPage mode={ModalErrors.ChangePasswordError} />} />
            <Route path={Paths.FEEDBACKS} element={<FeedbacksPage isSiderCollapsed={isSiderCollapsed} setIsSiderCollapsed={setIsSiderCollapsed} />} />

            <Route path='*' element={<Navigate to={Paths.MAIN} />} />
        </Routes>
    </HistoryRouter>
)