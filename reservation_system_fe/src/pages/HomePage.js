import Navbar from "../components/Navbar"
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, CardMedia, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";

import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const VirtualizeSwipeableViews = virtualize(AutoPlaySwipeableViews);


function HomePage() {

    let navigate = useNavigate();
    
    const goToMenu = () => {
        navigate('/menu');
    };

    const images = [
        "https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/369508160_122111374238003536_4799389075648270822_n.jpg?stp=cp6_dst-jpg_p720x720&_nc_cat=100&ccb=1-7&_nc_sid=783fdb&_nc_ohc=54sf1TBtXNAAX--2aeD&_nc_ht=scontent-prg1-1.xx&oh=00_AfDrFyy2KdtyZcj32oHN8wv7R5MtPQMAlH8vbCUwSx3iBg&oe=657FCE99",
        "https://www.ostravainfo.cz/images_firmy/9365_1-1521_1-campus-jpg-jpeg.jpeg",
    ];
    const [index, setIndex] = useState(0);
    const slideRenderer = ({ key, index }) => {
        const imgIndex = mod(index, images.length);
        return (
            <Paper key={key} elevation={4} sx={{ position: 'relative', height: 600, overflow: 'hidden'}}>
                <img src={images[imgIndex]} alt={`Slide ${imgIndex}`} style={{ width: '100%', height: 'auto' }} />
            </Paper>
        );
    };
    const springConfig = {
        duration: '0.6s',
        easeFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        delay: '0s',
    };

      

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Grid container spacing={2} alignItems="center" style={{ minHeight: '50vh' }}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ p: 2, textAlign: 'left', paddingLeft:"200px"}}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Vítá vás City Campus Coffee
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 2 }} >
                        Jsme kavárna/bistro/školní bufet/bar a mnoho dalšího. Jsme přesně to co zrovna potřebujete (provizorní text).
                        </Typography>
                        <Button 
                            variant="h2" 
                            sx={{
                                backgroundColor: '#e0e0e0',
                                color: '#000',
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: '200',
                                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                                '&:hover': {
                                    backgroundColor: '#d3d3d3', 
                                    boxShadow: '0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)' 
                                }
                            }} 
                            onClick={goToMenu}
                        >
                            Přejít na nabídku
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    height: '600px',
                    width: '100%', 
                }}>
                    <Box sx={{ width: '80%', height: 600}}>
                    <VirtualizeSwipeableViews
                        index={index}
                        onChangeIndex={(index) => setIndex(index)}
                        slideRenderer={slideRenderer}
                        springConfig={springConfig}
                    />
                </Box>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        flexGrow: 0,
                        borderRadius: '12px',
                        padding: '10px',
                        }}>
                        <IconButton component="a" href="https://www.instagram.com/citycampuscoffee/?igshid=NGVhN2U2NjQ0Yg%3D%3D" target="_blank" sx={{ color: 'black' }}>
                            <InstagramIcon fontSize="large" />
                        </IconButton>
                        <IconButton component="a" href="https://www.facebook.com/profile.php?id=61550106100216" target="_blank" sx={{ color: 'black', mt: '0px' }}>
                            <FacebookIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>
            </Grid>
            </Grid>
            <Footer/>
        </Box>
        
    );
}

export default HomePage;