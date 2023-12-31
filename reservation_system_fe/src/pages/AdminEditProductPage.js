import React from 'react';
import AdminSideBar from "../components/AdminSidebar";
import FoodList from "../components/AdminFoodList";


function AdminEditProductPage() {
    return (
        <div style={{ display:"flex", alignContent:"center", width:"100%", margin:"auto"}}>
            <AdminSideBar/>
            <div style={{ margin:"auto"}}>
                <FoodList/>
            </div>
        </div>
    )
}

export default AdminEditProductPage;