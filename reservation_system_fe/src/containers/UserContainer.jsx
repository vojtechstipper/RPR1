import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage.js";
import RegisterPage from "../pages/RegisterPage.js";
import PasswordResetPage from "../pages/PasswordResetPage.js";

const UserContainer = () => {
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<PasswordResetPage />} />
    </Routes>
}

export default UserContainer