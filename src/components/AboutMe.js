import styled from '@emotion/styled';
import { Avatar, Card, CardContent, Grid, Paper, Slide, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Typical from 'react-typical';
import Fade from 'react-reveal/Fade';

const AnimatedCard = styled(Card)`
  transition : transform 0.3s ease-in-out;
  &:hover{
    transform : scale(1.05);
    background-color: #d775d5;
  }
  cursor : pointer;
  background-color: #efb7ee;
`;

function AboutMe() {
    const [expanded, setExpanded] = useState(false);

    const handleCardClick = () => {
        setExpanded(!expanded);
    }
    //---------------------------------------
    const [aboutMeData, setAboutMeData] = useState({});

    useEffect(() => {
        const fetchDataAboutMe = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_about_me');
                setAboutMeData(response?.data);
            } catch (error) {
                console.error("Error fetching user data : ", error);
            }
        };

        fetchDataAboutMe();
    }, []);
    //------------------------------------
    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center" alignContent="center">
            <Grid item>
                <Fade top>
                    <Paper elevation={3} style={{ backgroundColor: 'rgb(171 53 152)', padding: '20px', margin: '20px', textAlign: 'center' }} >
                        <Typography variant="h4" style={{ color: '#fff' }}>
                            About Myself
                        </Typography>
                    </Paper>
                </Fade>
                <Fade top>
                    <AnimatedCard onClick={handleCardClick}
                        style={{ transform: expanded ? 'scale(1.25)' : 'scale(1)' }}>
                        <CardContent>
                            <Avatar alt="My Avatar"
                                src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile.png"
                                sx={{ width: 80, height: 80, marginBottom: 2 }} />
                            <Typography variant="h6" gutterBottom>
                                Hello My Friends! Welcome to my Web App! My Name is Nipuna.
                            </Typography>
                            <Typical
                                steps={[
                                    'I am an enthusiastic Programmer.',
                                    1000,
                                    'I hereby welcome you to my React Web Application.',
                                    1000,
                                ]}
                                loop={10}
                                wrapper="p"
                            />
                        </CardContent>
                    </AnimatedCard>
                </Fade>
            </Grid>

            <Grid item>
                <Fade bottom>
                    <Paper elevation={3} style={{ backgroundColor: '#3498DB', padding: '20px', margin: '20px', textAlign: 'center' }} >
                        <Typography variant="h4" style={{ color: '#fff' }}>
                            A List of my Friends
                        </Typography>
                    </Paper>
                </Fade>
                <Fade bottom>
                    <Card style={{ backgroundColor: "#aecce5" }}>
                        <CardContent>
                            <Grid container spacing={3} justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Avatar
                                        alt="My Username"
                                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Image.png"
                                        sx={{ width: 60, height: 60 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color="textSecondary" variant='h6'> {aboutMeData[0]?.name ? aboutMeData[0].name : "Data not available"}  </Typography>
                                    <Typography> {aboutMeData[0]?.expertise ? aboutMeData[0].expertise : "Data not available"}  </Typography>
                                    <Typography> {aboutMeData[0]?.description ? aboutMeData[0].description : "Data not available"} </Typography>

                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid container spacing={3} justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Avatar
                                        alt="My Username"
                                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Clipart.png"
                                        sx={{ width: 60, height: 60 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color="textSecondary" variant='h6'> {aboutMeData[1]?.name ? aboutMeData[1].name : "Data not available"}  </Typography>
                                    <Typography> {aboutMeData[1]?.expertise ? aboutMeData[1].expertise : "Data not available"}  </Typography>
                                    <Typography> {aboutMeData[1]?.description ? aboutMeData[1].description : "Data not available"} </Typography>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid container spacing={3} justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Avatar
                                        alt="My Username"
                                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images-HD.png"
                                        sx={{ width: 60, height: 60 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color="textSecondary" variant='h6'> {aboutMeData[2]?.name ? aboutMeData[2].name : "Data not available"}  </Typography>
                                    <Typography> {aboutMeData[2]?.expertise ? aboutMeData[2].expertise : "Data not available"}  </Typography>
                                    <Typography> {aboutMeData[2]?.description ? aboutMeData[2].description : "Data not available"} </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>
            </Grid>

        </Grid>
    );

}

export default AboutMe;