import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Button, TextField } from '@mui/material';
import './LandingPage.css'; // Create a CSS file for additional styling

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: false, 
        });
    }, []);

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', paddingBottom: '50px' }}>
            {/* Jumbotron Section */}
            <Box className="jumbotron">
                {/* Particle Effect */}
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>

                <Container sx={{ position: 'relative', zIndex: 1 }} data-aos="fade-up">
                    <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                        Welcome to Our Site
                    </Typography>
                    <Typography variant="h6">
                        Experience amazing visuals and interactive effects
                    </Typography>
                    <Button variant="contained" color="primary" size="large" sx={{ marginTop: '20px' }} data-aos="zoom-in">
                        Get Started
                    </Button>
                </Container>
            </Box>

            {/* Gallery Section */}
            <Container sx={{ marginTop: '50px' }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: '30px' }} data-aos="fade-up">
                    Gallery
                </Typography>
                <Grid container spacing={3}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://picsum.photos/300/200?random=${index + 1}`}
                                    alt={`Gallery Image ${index + 1}`}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Meet Our Team Section */}
            <Container sx={{ marginTop: '50px' }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: '30px' }} data-aos="fade-up">
                    Meet Our Team
                </Typography>
                <Grid container spacing={3}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up" data-aos-delay={`${index * 200}`}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`https://i.pravatar.cc/300?img=${index + 10}`}
                                    alt={`Team Member ${index + 1}`}
                                />
                                <CardContent>
                                    <Typography variant="h6">Member {index + 1}</Typography>
                                    <Typography variant="body2">Position</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Contact Us Section */}
            <Container sx={{ marginTop: '50px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: 3 }} data-aos="fade-up">
                <Typography variant="h4" align="center" sx={{ marginBottom: '30px' }}>
                    Contact Us
                </Typography>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} data-aos="fade-up" data-aos-delay="100">
                            <TextField label="Name" fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} data-aos="fade-up" data-aos-delay="200">
                            <TextField label="Email" fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={12} data-aos="fade-up" data-aos-delay="300">
                            <TextField label="Comments" multiline rows={4} fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={12} align="center" data-aos="zoom-in" data-aos-delay="400">
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
};

export default LandingPage;
