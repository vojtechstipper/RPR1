import React from 'react';
import Typography from "@mui/material/Typography";
import AdminSideBar from "../components/AdminSidebar";


function AdminEditProductPage() {
    return (
        <div style={{ display: "flex"}}>
            <AdminSideBar/>
            <div>
                <Typography>ADMIN EDIT PRODUCT PAGE</Typography>
            </div>
        </div>
    )
}

export default AdminEditProductPage;