import { Routes, Route } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage";
import AdminStatsPage from "../pages/AdminStatsPage";
import AdminEditProductPage from "../pages/AdminEditProductPage";
import AdminEditUserPage from "../pages/AdminEditUserPage";

const AdminContainer = () => {
    <Routes>
        <Route path="admin/home" element={<AdminHomePage />} />
        <Route path="admin/stats" element={<AdminStatsPage />} />
        <Route path="admin/edit/products" element={<AdminEditProductPage />} />
        <Route path="admin/edit/users" element={<AdminEditUserPage />} />
    </Routes>
}

export default AdminContainer