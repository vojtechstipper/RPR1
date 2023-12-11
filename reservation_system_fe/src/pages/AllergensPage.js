import Navbar from "../components/Navbar"
import React from 'react';
import AllergensList from "../components/AllergensList";
import Footer from "../components/Footer";


function AllergensPage() {
    return(
       
        <div>
            <Navbar/>
            <AllergensList />
            <Footer/>
        </div>

    )
}

export default AllergensPage;