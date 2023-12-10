import React from 'react';
import Typography from "@mui/material/Typography";
import AdminSideBar from "../components/AdminSidebar";


function AdminStatsPage() {
    return (
        <div style={{ display: "flex"}}>
            <AdminSideBar/>
            <div>
                <Typography>ADMIN STATS PAGE</Typography>
            </div>
        </div>
    )
}

export default AdminStatsPage;