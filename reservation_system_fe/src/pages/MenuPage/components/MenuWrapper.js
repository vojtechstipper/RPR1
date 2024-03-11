import React from "react";
import {
  Box,
  AppBar,
  Button,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  useTheme,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100], // Světlejší šedá pro AppBar
  color: theme.palette.text.primary,
  paddingBottom: 5,
  borderRadius: 10,
}));

const ActiveButton = styled(Button)(({ theme, active }) => ({
  fontWeight: "bold",
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
}));

const MenuWrapper = ({
  children,
  categories,
  handleSearchTermChange,
  searchTermVal,
}) => {
  const theme = useTheme();

  const handleButtonClick = (itemKey, event) => {
    event.preventDefault(); // Předcházení skákání stránky
    handleSearchTermChange(itemKey);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(5),
        margin: "auto",
        width: { xs: "100%", sm: "100%", md: "95%" },
        height: "100%",
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <Paper
        elevation={0}
        sx={{ width: "100%", marginBottom: theme.spacing(3) }}
      >
        <CustomAppBar position="static" elevation={3}>
          <Toolbar
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: { xs: "10px", sm: "0px" },
              pb: 1,
              pt: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                gap: 1,
              }}
            >
              {categories.map((item, index) => (
                <ActiveButton
                  key={index}
                  sx={{ mb: { xs: 1, sm: 0 }, mr: 1, fontSize: "1rem" }}
                  active={searchTermVal === item.productType.name}
                  onClick={(event) =>
                    handleButtonClick(item.productType.name, event)
                  }
                >
                  {item.productType.name}
                </ActiveButton>
              ))}
            </Box>
            <InputBase
              sx={{
                backgroundColor: "white",
                padding: "0 10px",
                borderRadius: 10,
                width: "100%",
                mt: { xs: 2, sm: 2, md: 2, xl: 2 },
                fontSize: "1rem",
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

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          backgroundColor: theme.palette.grey[100],
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default MenuWrapper;
