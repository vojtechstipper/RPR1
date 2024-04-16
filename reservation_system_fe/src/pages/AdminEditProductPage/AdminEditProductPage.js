import React from 'react';
import AdminSideBar from "../../components/shared/admin/AdminSidebar";
import FoodList from "../../components/shared/admin/AdminFoodList";

import 'react-toastify/dist/ReactToastify.css';
import Typography from "@mui/material/Typography";


function AdminEditProductPage() {
    return (
        <div style={{ display:"flex", alignContent:"center", width:"100%", margin:"auto"}}>
            <AdminSideBar/>
            <div style={{ margin:"auto"}}>
                <Typography> coeeee </Typography>
                <FoodList/>
            </div>
        </div>
    )
}

export default AdminEditProductPage;