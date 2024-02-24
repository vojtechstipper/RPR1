import React from "react";
import { Grid, Typography, Link, Box, Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  return (
    <Container component="footer" maxWidth="xl" sx={{ mt: 8, py: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Kontaktní údaje
          </Typography>
          <Typography variant="body2">
            Informace o provozovateli: (text bude dodán)
          </Typography>
          <Typography variant="body2">
            Adresa: Moravská Ostrava 3397, Ostrava 702 00
          </Typography>
          <Typography variant="body2">Telefonní číslo: 737 513 759</Typography>
          <Typography variant="body2">
            E-mailová adresa: lanzaya@email.cz
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Otevírací doba
          </Typography>
          <Typography variant="body2">Pondělí: 9 - 17</Typography>
          <Typography variant="body2">Úterý: 8 - 17</Typography>
          <Typography variant="body2">Středa: 8 - 17</Typography>
          <Typography variant="body2">Čtvrtek: 8 - 17</Typography>
          <Typography variant="body2">Pátek: 9 - 17</Typography>
          <Typography variant="body2">Sobota - Neděle: dle akcí</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Sociální sítě
          </Typography>
          <Link
            href="#"
            target="_blank"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <InstagramIcon sx={{ mr: 1 }} /> Instagram
          </Link>
          <Link
            href="#"
            target="_blank"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <FacebookIcon sx={{ mr: 1 }} /> Facebook
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Mapa
          </Typography>
          <Box
            component="iframe"
            sx={{ width: "100%", height: 200, border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=City%20Campus&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
