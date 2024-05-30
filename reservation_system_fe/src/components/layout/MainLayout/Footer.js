import React from "react";
import { Grid, Typography, Link, Box, Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

function Footer() {
  const instagramLink = process.env.REACT_APP_INSTAGRAM;
  const facebookLink = process.env.REACT_APP_FACEBOOK;
  const googleMapsLink = process.env.REACT_APP_GOOGLE_MAPS;
  return (
    <Container component="footer" maxWidth="xl" sx={{ mt: 8, py: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Kontaktní údaje
          </Typography>
          <Typography variant="body2">
            Informace o provozovateli:
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
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'left', maxWidth: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">Sociální sítě</Typography>
              <Link href={instagramLink} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, textDecoration: 'none', color:'black' }}>
                <InstagramIcon sx={{ mr: 1 }} />
                Instagram
              </Link>
              <Link href={facebookLink} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, textDecoration: 'none', color:'black' }}>
                <FacebookIcon sx={{ mr: 1 }} />
                Facebook
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'left', maxWidth: '100%' }}>
            <Typography variant="h6" fontWeight="bold">Mapa</Typography>
            <Box
              component="iframe"
              sx={{
                width: 1, 
                maxWidth: '300px', 
                height: 150, 
              }}
              title="map"
              src={googleMapsLink}
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            />
        </Box>
          </Grid>
        
        </Grid>
      </Container>
   
  );
}

export default Footer;
