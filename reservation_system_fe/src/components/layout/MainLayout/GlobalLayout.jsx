import React from 'react'
import Footer from './Footer'
import ButtonAppBar from './Navbar'
import { Outlet } from 'react-router-dom'
import OrderBanner from './OrderBanner'

export const GlobalLayout = () => {
  return (
    <>
        <OrderBanner/>
        <ButtonAppBar/>
        <Outlet/>
        <Footer />
    </>
  )
}

export default GlobalLayout;
