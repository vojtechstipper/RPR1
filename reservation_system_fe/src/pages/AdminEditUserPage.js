import React from 'react';
import Typography from "@mui/material/Typography";
import AdminSideBar from "../components/AdminSidebar";


function AdminEditUserPage() {
    return (
        <div style={{ display: "flex"}}>
            <AdminSideBar/>
            <div>
                <Typography>ADMIN EDIT USER PAGE</Typography>
            </div>
        </div>
    )
}

export default AdminEditUserPage;