import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import CoverPhoto from '../../static/img/coverphoto.jpg';

const AboutUs = () => {
    const aboutPageText = process.env.REACT_APP_ABOUTPAGE.replace(/\\n/g, '\n');

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
                    <img src={CoverPhoto} alt="Cover" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutUs;
