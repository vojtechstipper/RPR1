import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemText,
  Avatar,
  Grid,
  Button,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import logo from "../static/img/logoCCC.jpeg";

export default function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { name: "Domů", path: "/" },
    { name: "Nabídka", path: "/menu" },
    { name: "Alergeny", path: "/allergens" },
    { name: "O nás", path: "/about" },
  ];

  const handleNavigate = (path) => () => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <List>
      {navigationItems.map((item, index) => (
        <ListItemButton key={item.name} onClick={handleNavigate(item.path)}>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{ fontSize: "1.1rem" }}
          />
        </ListItemButton>
      ))}
      <ListItemButton onClick={handleNavigate("/shoppingcart")}>
        <ListItemText
          primary="Košík"
          primaryTypographyProps={{ fontSize: "1.1rem" }}
        />
      </ListItemButton>
      <ListItemButton onClick={handleNavigate("/login")}>
        <ListItemText
          primary="Přihlásit se"
          primaryTypographyProps={{ fontSize: "1.1rem" }}
        />
      </ListItemButton>
    </List>
  );

  return (
    <AppBar
      position="static"
      style={{ background: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="company logo"
              onClick={handleNavigate("/")}
              sx={{
                display: { xs: "flex", sm: "flex" },
                "& .MuiAvatar-root": {
                  width: 48,
                  height: 48,
                  transition: "width 0.3s ease, height 0.3s ease",
                },
              }}
            >
              <Avatar src={logo} sx={{ width: 48, height: 48 }} />
            </IconButton>
          </Grid>
          <Grid
            item
            sx={{
              flexGrow: 1,
              display: { sm: "flex" },
              justifyContent: "center",
              "& .MuiButton-root": {
                mx: 1,
                fontSize: "1.2rem",
              },
            }}
          >
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                onClick={handleNavigate(item.path)}
                sx={{
                  color: "black",
                  textTransform: "none",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={handleNavigate("/shoppingcart")}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleNavigate("/login")}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <PersonOutlineIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 2, display: { xs: "block", sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}
