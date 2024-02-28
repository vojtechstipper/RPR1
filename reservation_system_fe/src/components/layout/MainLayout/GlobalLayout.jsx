import React from 'react'
import Footer from './Footer'
import ButtonAppBar from './Navbar'
import { Outlet } from 'react-router-dom'

export const GlobalLayout = () => {
  return (
    <>
        <ButtonAppBar/>
        <Outlet/>
        <Footer />
    </>
  )
}

export default GlobalLayout;
