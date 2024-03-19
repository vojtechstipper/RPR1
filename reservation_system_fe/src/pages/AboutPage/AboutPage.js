import React from 'react';
import { Container, Typography, Grid,} from '@mui/material';
import ImageGallery from 'react-image-gallery';
import Coverphoto from '../../static/img/coverphoto.jpg';
import 'react-image-gallery/styles/css/image-gallery.css';
import './components/AboutPage.css';

// Import your images
//import Photo1 from '../../static/img/photo1.jpg';
//import Photo2 from '../../static/img/photo2.jpg';
//import Photo3 from '../../static/img/photo3.jpg';

import 'react-image-gallery/styles/css/image-gallery.css';

const AboutUs = () => {
    const aboutPageText = process.env.REACT_APP_ABOUTPAGE.replace(/\\n/g, '\n');
  const images = [
    {
      original: Coverphoto,
      thumbnail: Coverphoto,
    },
    {
      original: Coverphoto,
      thumbnail: Coverphoto,
    },
    {
      original: Coverphoto,
      thumbnail: Coverphoto,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} alignItems="center" sx={{ padding: '20px',}}>
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
            <ImageGallery items={images} autoPlay={true} showPlayButton={false} slideInterval={5000} infinite={true} showThumbnails={false} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;