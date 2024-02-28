import React from 'react'
import AdminSideBar from '../../shared/admin/AdminSidebar'
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <>
     <AdminSideBar/>
     <Outlet />
    </>
  )
}

export default AdminLayout;
