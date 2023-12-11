import Navbar from "../components/Navbar"
import React from 'react';
import { Box, Typography, Button, Grid, Paper, CardMedia, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";


function HomePage() {

    let navigate = useNavigate();
    
    const goToMenu = () => {
        navigate('/menu');
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
                    <Paper elevation={4} sx={{ 
                        maxWidth: '80%',
                        height: '80%',
                        overflow: 'hidden',
                    }}>
                        <CardMedia
                            component="img"
                            image="https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/369508160_122111374238003536_4799389075648270822_n.jpg?stp=cp6_dst-jpg_p720x720&_nc_cat=100&ccb=1-7&_nc_sid=783fdb&_nc_ohc=54sf1TBtXNAAX--2aeD&_nc_ht=scontent-prg1-1.xx&oh=00_AfDXU9cu0SLXRngEhoQ9tHgeQOxCAvxO17RJ_sgjlRXnew&oe=657BDA19"
                            alt="City Campus Coffee"
                            sx={{ height: 'auto', width: '100%' }}
                        />
                    </Paper>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        flexGrow: 0,
                        backgroundColor: '#d3d3d3', // This sets the background color
                        borderRadius: '10px', // This will make the edges rounded
                        padding: '10px' // This adds some space inside the box around the icons
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