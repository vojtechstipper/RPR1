import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import Aboutphoto1 from '../../static/img/coverphoto.jpg';
import Aboutphoto2 from '../../static/img/aboutphoto.jpg';

const AboutUs = () => {
  const aboutPageText = process.env.REACT_APP_ABOUTPAGE.replace(/\\n/g, '\n');
  
  const images = [
    Aboutphoto1,
    Aboutphoto2,
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} alignItems="center" sx={{ padding: '20px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="left">
            O nás
          </Typography>
          <Typography variant="body1" paragraph>
            {aboutPageText.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Carousel>
            {images.map((image, index) => (
              <Carousel.Item key={index} interval={5000}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${index + 1}`}
                  //style={{ borderRadius: '6px' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
