import React, { useState, useEffect } from "react";
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
  Divider,
  ListItemButton,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "../../../static/img/logoCCC.jpeg";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";

export default function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userName = "Petr";

  useEffect(() => {
    const handleAuthChange = () => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/login");
    window.dispatchEvent(new Event("authChanged"));
  };

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
          <Divider sx={{ borderBottomWidth: 2 }} />
        </ListItemButton>
      ))}
      <Divider sx={{ borderBottomWidth: 2 }} />
      <ListItemButton onClick={handleNavigate("/shoppingcart")}>
        <ListItemText
          primary="Košík"
          primaryTypographyProps={{ fontSize: "1.1rem" }}
        />
      </ListItemButton>
      {!isAuthenticated ? (
        <ListItemButton onClick={handleNavigate("/login")}>
          <ListItemText
            primary="Přihlásit se"
            primaryTypographyProps={{ fontSize: "1.1rem" }}
          />
        </ListItemButton>
      ) : (
        <>
          <ListItemButton>
            <ListItemText
              primary={"Profil:"}
              primaryTypographyProps={{ fontSize: "1.1rem" }}
            />
            <Typography variant="h6">{userName}</Typography>
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemText
              primary="Odhlásit se"
              primaryTypographyProps={{ fontSize: "1.1rem" }}
            />
          </ListItemButton>
        </>
      )}
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
            {!isAuthenticated ? (
              <IconButton
                color="inherit"
                onClick={handleNavigate("/login")}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <PersonOutlineIcon />
              </IconButton>
            ) : (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleNavigate("/profilePage")}
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  <PersonOutlineIcon />
                </IconButton>
                <Typography
                  sx={{ display: { xs: "none", sm: "block" }, marginRight: 2 }}
                >
                  {userName}
                </Typography>
                <Button
                  onClick={handleLogout}
                  sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
                >
                  Odhlásit
                </Button>
              </>
            )}

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
