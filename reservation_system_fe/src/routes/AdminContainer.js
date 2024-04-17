import { Routes, Route } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage/AdminHomePage";
import AdminStatsPage from "../pages/AdminStatsPage/AdminStatsPage";
import AdminEditProductPage2 from "../pages/AdminEditProductPage/AdminEditProductPage2";
import AdminEditUserPage from "../pages/AdminEditUserPage/AdminEditUserPage";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";

// TODO home byl odstranenn -> musi se poupravit cesty na admin/home => vymazat home cast pouze /admin/
const AdminContainer = {
    path: '/admin/',
    element: <AdminLayout/>,
    children: [
        {
            path: 'home',
            element: <AdminHomePage />
        },
        {
            path: 'stats',
            element: <AdminStatsPage/>
        },
        {
            path: 'edit/products',
            element: <AdminEditProductPage2/>
        },
        {
            path: 'edit/users',
            element: <AdminEditUserPage/>
        }
    ]
}

export default AdminContainer