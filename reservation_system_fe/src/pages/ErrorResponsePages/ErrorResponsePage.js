import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../static/img/logoCCC.jpeg";

const ErrorResponsePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const errorStatusCode = location.state?.error || "Neznámá chyba";

    let errorTitle;
    let errorMessage;
    if (errorStatusCode === 401) {
        errorTitle = "NEOPRÁVNĚNÝ PŘÍSTUP";
        errorMessage = "Prosím, přihlaste se znovu."
    } else if (errorStatusCode === 403) {
        errorTitle = "PŘÍSTUP ODEPŘEN";
        errorMessage = "Nemáte oprávnění k zobrazení této stránky."
    } else if (errorStatusCode === 400) {
        errorTitle = "NEPLATNÝ POŽADAVEK";
        errorMessage = "Váš požadavek nebyl správně naformátován nebo obsahuje neplatné údaje. Prosím, zkontrolujte své údaje a zkuste to znovu."
    } else {
        errorTitle = "Chyba";
        errorMessage = "Něco se pokazilo."
    }

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
                {errorTitle}
            </Typography>
            <Typography variant="subtitle1">
                {errorMessage}
            </Typography>
            <Button
                variant="contained"
                onClick={() => {
                    if (errorStatusCode === 400) {
                        window.history.back();
                    } else {
                        navigate("/");
                    }
                }}
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
                {errorStatusCode === 400 ? "Zpět" : "Zpět na úvodní stránku"}
            </Button>
        </Box>
    );
};

export default ErrorResponsePage;
