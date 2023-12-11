import React from 'react';
import Box from '@mui/material/Box';
import {AppBar, Button, IconButton, InputBase, styled, Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TransparentAppBar = styled(AppBar)(({theme}) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}));

const MenuWrapper = ({children, handleSearchTermChange, searchTermVal}) => {
    return (
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
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <TransparentAppBar position="static">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
         <Box sx={{ flex: "1 1 auto" }}>
                {children.map((item) => (
                  <Button
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                      marginBottom: "8px",
                    }} onClick={() => {
                      handleSearchTermChange(item.key)
                    }}
                  >
                    {item.key}

                  </Button>
                ))}
              </Box>
        
         
                <InputBase
                  id="input-with-icon-adornment"
                  elevation={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    ml: 1,
                    paddingLeft:"5px"
                  }}
                  endAdornment={
                    <IconButton type="button" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  }
                  placeholder="Hledat položku"
                  value={searchTermVal}
                  onChange={(e) => handleSearchTermChange(e.target.value)}
                />

       
             
            </Toolbar>
          </TransparentAppBar>
        </Box>
        <Box
          sx={{
            paddingLeft: "40px",
            width:"100%"
          }}
        >
          {children}
        </Box>
      </Box>
    );
};

export default MenuWrapper;