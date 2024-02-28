import React from 'react';
import Box from '@mui/material/Box';
import { AppBar, Button, IconButton, InputBase, Paper, Toolbar, useTheme, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200], // Šedé pozadí pro AppBar
    color: theme.palette.text.primary, // Barva textu
}));

const MenuWrapper = ({ children, handleSearchTermChange, searchTermVal }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(5),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "100%",
                minWidth: "300px",
                margin: "auto",
                width: "75%",
                borderRadius: theme.shape.borderRadius,
            }}
        >
            <Paper elevation={3} sx={{ flexGrow: 1, width: "100%", marginBottom: theme.spacing(3), borderRadius: theme.shape.borderRadius, backgroundColor: theme.palette.grey[100] }}>
                <CustomAppBar position="static" elevation={0}>
                    <Toolbar
                        sx={{
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                        }}
                    >
                        <Box sx={{ flex: "1 1 auto", display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
                            {children.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        fontWeight: "bold",
                                        color: theme.palette.text.primary,
                                        marginBottom: theme.spacing(1),
                                        marginRight: theme.spacing(1),
                                    }}
                                    onClick={() => handleSearchTermChange(item.key)}
                                >
                                    {item.key}
                                </Button>
                            ))}
                        </Box>
                        <InputBase
                            sx={{
                                backgroundColor: "white",
                                padding: "0 10px",
                                borderRadius: theme.shape.borderRadius,
                                display: "flex",
                                alignItems: "center",
                                width: { xs: "100%", sm: "auto" },
                                marginTop: { xs: theme.spacing(1), sm: "0" },
                            }}
                            endAdornment={
                                <IconButton type="submit" aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            }
                            placeholder="Hledat položku"
                            value={searchTermVal}
                            onChange={(e) => handleSearchTermChange(e.target.value)}
                        />
                    </Toolbar>
                </CustomAppBar>
            </Paper>
            <Box sx={{ width: "100%", backgroundColor: theme.palette.grey[200], padding: theme.spacing(2), borderRadius: theme.shape.borderRadius }}>
                {children}
            </Box>
        </Box>
    );
};

export default MenuWrapper;
