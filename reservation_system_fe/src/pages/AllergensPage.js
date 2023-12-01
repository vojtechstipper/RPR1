import Navbar from "../components/Navbar"
import React from 'react';
import AllergensList from "../components/AllergensList";


function AllergensPage() {
    return(
       
        <div>
            <Navbar/>
            <AllergensList />
        </div>

    )
}

export default AllergensPage;