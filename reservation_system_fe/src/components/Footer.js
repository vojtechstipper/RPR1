import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function Footer() {
  const facebookLink = process.env.REACT_APP_FACEBOOK;
  const instagramLink = process.env.REACT_APP_INSTAGRAM;

  return (
 
      <Container maxWidth={false} sx={{marginTop:"50px",  maxWidth: "2000px",
      minWidth: "700px",
      width: "80%", borderRadius: "12px" }}>
        <Grid container spacing={2} alignItems="flex-start" justifyContent="space-between">
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'left', maxWidth: '100%' }}>
            <Typography variant="h6" fontWeight="bold">Kontaktní údaje</Typography>
            <Typography>Informace o provozovateli: (text bude dodán)</Typography>
            <Typography>Adresa: Moravská Ostrava 3397, Ostrava 702 00</Typography>
            <Typography>Telefonní číslo: 737 513 759</Typography>
            <Typography>E-mailová adresa: lanzaya@email.cz</Typography>
        </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'left', maxWidth: '100%' }}>
            <Typography variant="h6" fontWeight="bold">Otevírací doba</Typography>
            <Typography>Pondělí: 9 - 17</Typography>
            <Typography>Úterý: 8 - 17</Typography>
            <Typography>Středa: 8 - 17</Typography>
            <Typography>Čtvrtek: 8 - 17</Typography>
            <Typography>Pátek: 9 - 17</Typography>
            <Typography>Sobota - Neděle: dle akcí</Typography>
        </Box>
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
              src="https://maps.google.com/maps?q=City%20Campus&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
