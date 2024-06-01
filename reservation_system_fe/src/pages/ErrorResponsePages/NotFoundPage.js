import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import logo from "../../static/img/logoCCC.jpeg";


const ThanksForOrderPage = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    };

    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                p: 4,
            }}
        >
            <Box
                component="img"
                sx={{
                    height: 'auto',
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: 120,
                    my: 2,
                }}
                src={logo}
                alt="Logo"
            />
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                STRÁNKA NENALEZENA
            </Typography>
            <Typography variant="subtitle1">
                Je nám líto, ale požadovaná stránka nebyla nalezena. Ujistěte se, že máte správně URL adresu.
            </Typography>
            <Button
                variant="contained"
                onClick={goToHome}
                sx={{
                    mt: 4,
                    textTransform: 'none',
                    color: 'black',
                    backgroundColor: '#f1efef',
                    '&:hover': {
                        backgroundColor: '#f1efef',
                    },
                }}
            >
                Zpět na úvodní stránku
            </Button>
        </Box>
    );
};

export default ThanksForOrderPage;