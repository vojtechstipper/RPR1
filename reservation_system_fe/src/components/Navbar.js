import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Grid from "@mui/material/Grid";
import logo from '../static/img/logoCCC.jpeg'
import {Avatar} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function ButtonAppBar() {

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    };

    const navigateMenu = () => {
        navigate('/menu');
    };

    const navigateAbout = () => {
        navigate('/about');
    };

    return (
        <Box
            sx={{
                background: "inherit",
                padding: "30px",
                minWidth: "900px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Grid container spacing={2} direction={"row"}>
                <Grid xs>
                    <IconButton sx={{p: 0}} onClick={navigateHome}>
                        <Avatar src={logo}/>
                    </IconButton>
                </Grid>
                <Grid xs={10}>

                    <Button
                        sx={{
                            textTransform: "none",
                            size: "large",
                            color: "inherit"
                        }}
                        onClick={navigateHome}
                    >
                        <Typography variant="h6" fontWeight="bold" component="div">
                            Domů
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            textTransform: "none",
                            size: "large",
                            marginLeft: 5,
                            color: "inherit"
                        }}
                        onClick={navigateMenu}
                    >
                        <Typography variant="h6" fontWeight="bold" component="div">
                            Nabídka
                        </Typography>
                    </Button>
                    <Button
                        sx={{
                            textTransform: "none",
                            size: "large",
                            marginLeft: 5,
                            color: "inherit"
                        }}
                        onClick={navigateAbout}
                    >
                        <Typography variant="h6" fontWeight="bold" component="div">
                            O nás
                        </Typography>
                    </Button>

                </Grid>
                <Grid>
                    <IconButton
                        aria-label="person"
                        color="inherit"
                        size="large"
                    >
                        <PersonOutlineIcon fontSize="medium-large"/>
                    </IconButton>
                    <IconButton
                        aria-label="person"
                        color="inherit"
                        size="large"
                    >
                        <ShoppingCartOutlinedIcon fontSize="medium-large"/>
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
        ;
}