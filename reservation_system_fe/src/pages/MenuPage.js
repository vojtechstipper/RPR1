import Navbar from "../components/Navbar"
import React from 'react';
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";


function MenuPage() {
    return(
        <div>
            <Navbar/>
            <ProductList />
            <Footer/>
        </div>

    )
}

export default MenuPage;