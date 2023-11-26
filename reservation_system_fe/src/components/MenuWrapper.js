import React from 'react';
import Box from '@mui/material/Box';
import {AppBar, Button, IconButton, InputBase, Paper, styled, Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TransparentAppBar = styled(AppBar)(({theme}) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}));

const MenuWrapper = ({children, handleSearchTermChange, searchTermVal}) => {
    return (
        // <button onClick={(e)=>{handleSearchTermChange("dappio")}}>aaaa</button>
        <Box
            sx={{
                backgroundColor: "#d3d3d3",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "2000px",
                minWidth: "700px",
                margin: "auto",
                width: "75%",
                borderRadius: "12px",
            }}
        >
            <Box sx={{flexGrow: 1, width: "100%"}}>
                <TransparentAppBar position="static">
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <Box sx={{flex: "1 1 auto"}}>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Káva
                            </Button>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Čaje
                            </Button>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Čepované/rozlévané nápoje
                            </Button>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Balené nápoje
                            </Button>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Smoothie
                            </Button>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Jídlo
                            </Button>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Speciality
                            </Button>
                            <Button sx={{fontWeight: "bold", color: "black"}}>
                                Jiné
                            </Button>
                        </Box>
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "4px",
                                backgroundColor: "white",
                                ml: 1,
                            }}
                        >
                            <InputBase
                                id="input-with-icon-adornment"
                                endAdornment={
                                    <IconButton type="button" aria-label="search">
                                        <SearchIcon/>
                                    </IconButton>
                                }
                                placeholder="Vyhledat podle názvu nebo typu"
                                value={searchTermVal}
                                onChange={(e) => handleSearchTermChange(e.target.value)}
                            />
                        </Paper>
                    </Toolbar>
                </TransparentAppBar>
            </Box>
            <Box
                sx={{
                    paddingLeft: "40px",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MenuWrapper;