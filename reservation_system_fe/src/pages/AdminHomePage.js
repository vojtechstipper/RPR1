import React from 'react';
import Typography from "@mui/material/Typography";
import AdminSideBar from "../components/AdminSidebar";


function AdminHomePage() {
    return (
        <div style={{ display: "flex"}}>
            <AdminSideBar/>
            <div>
                <Typography>ADMIN HOME PAGE</Typography>
            </div>
        </div>
    )
}

export default AdminHomePage;