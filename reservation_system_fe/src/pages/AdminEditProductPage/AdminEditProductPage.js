import React from 'react';
import AdminSideBar from "../../components/shared/admin/AdminSidebar";
import FoodList from "../../components/shared/admin/AdminFoodList";


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