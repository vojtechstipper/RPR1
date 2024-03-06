import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.js";
import RegisterPage from "../pages/RegisterPage/RegisterPage.js";
import PasswordResetPage from "../pages/PasswordResetPage/PasswordResetPage.js";

const UserContainer = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotPassword" element={<PasswordResetPage />} />
        </Routes>
    )
}

export default UserContainer