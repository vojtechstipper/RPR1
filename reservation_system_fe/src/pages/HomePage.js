import Navbar from "../components/Navbar"
import React from 'react';
import Typography from "@mui/material/Typography";
import Footer from "../components/Footer";


function HomePage() {
    return(
        <div>
            <Navbar/>
            <Typography>Home</Typography>
            <Footer/>
        </ div>
    )
}

export default HomePage;