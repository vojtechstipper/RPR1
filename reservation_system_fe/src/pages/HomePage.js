import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CardMedia,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";
import Coverphoto from "../static/img/coverphoto.jpg";

function HomePage() {
  let navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const goToMenu = () => {
    navigate("/menu");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", padding: matches ? 2 : 8 }}
      >
        <Grid item xs={12} md={6} sx={{ p: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            textAlign={matches ? "center" : "left"}
          >
            Vítá vás City Campus Coffee
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, textAlign: matches ? "center" : "left" }}
          >
            Jsme kavárna/bistro/školní bufet/bar a mnoho dalšího. Jsme přesně
            to, co zrovna potřebujete (provizorní text).
          </Typography>
          <Box
            display="flex"
            justifyContent={matches ? "center" : "flex-start"}
          >
            <Button
              variant="contained"
              onClick={goToMenu}
              sx={{
                textTransform: "none",
                color: 'black',
                backgroundColor: '#f1efef',
                '&:hover': {
                  backgroundColor: '#f1efef',
                }
              }}
            >
              Přejít na nabídku
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper elevation={4} sx={{ maxWidth: "80%", overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={Coverphoto}
              alt="City Campus Coffee"
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        >
          <IconButton
            component="a"
            href="https://www.instagram.com/citycampuscoffee/?igshid=NGVhN2U2NjQ0Yg%3D%3D"
            target="_blank"
          >
            <InstagramIcon fontSize="large" sx={{ color: 'black' }} />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.facebook.com/profile.php?id=61550106100216"
            target="_blank"
            sx={{ ml: 2 }}
          >
            <FacebookIcon fontSize="large" sx={{ color: 'black' }} />
          </IconButton>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default HomePage;
