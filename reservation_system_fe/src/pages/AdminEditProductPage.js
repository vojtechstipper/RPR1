import React from 'react';
import Typography from "@mui/material/Typography";
import AdminSideBar from "../components/AdminSidebar";
import FoodList from "../components/AdminFoodList";


function AdminEditProductPage() {
    return (
        <div style={{ display: "flex"}}>
            <AdminSideBar/>
            <div style={{display:"flex", alignContent:"center", width:"80%"}}>
                <Typography>ADMIN EDIT PRODUCT PAGE</Typography>
                <FoodList/>
            </div>
        </div>
    )
}

export default AdminEditProductPage;