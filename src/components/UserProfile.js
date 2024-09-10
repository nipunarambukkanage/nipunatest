import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, Grid, Typography, Paper } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Particles from 'react-tsparticles';
import Lottie from 'react-lottie';
import carAnimation from './carAnimation.json';
import Typical from 'react-typical';
import Fade from 'react-reveal/Fade';
import { motion } from 'framer-motion';

const UserProfile = () => {
    const [user, setUser] = useState({
        name: 'No data came from backend',
        school: 'No data came from backend',
        dob: 'No data came from backend',
        email: 'No data came from backend',
        description: 'No data came from backend',
        avatar: 'https://flxt.tmsimg.com/assets/p186109_i_v9_ad.jpg' // Default image
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_user');
                setUser(prevState => ({ ...prevState, ...response.data }));
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUserData();
    }, []);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                params: {
                    key: '30f74123f52909ae39cad7541ab440a7',
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const imageUrl = response.data.data.url;
            setUser(prevState => ({ ...prevState, avatar: imageUrl }));
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: carAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
            <Particles
                id="tsparticles"
                options={{
                    particles: {
                        number: {
                            value: 50,
                        },
                        color: {
                            value: "#000000", // Black particles
                        },
                        shape: {
                            type: "circle",
                        },
                        opacity: {
                            value: 0.5,
                        },
                        size: {
                            value: 3,
                        },
                        move: {
                            enable: true,
                            speed: 2,
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: "repulse",
                            },
                        },
                    },
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            />
            <Grid container spacing={3} style={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} md={4} lg={3} style={{ marginTop: "64px" }}>
                    <Paper style={{ padding: 20, textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <div {...getRootProps()} style={{ cursor: 'pointer' }}>
                            <input {...getInputProps()} />
                            {/* Avatar with Framer Motion for animation */}
                            <motion.div
                                style={{ display: 'inline-block', transformOrigin: 'center' }} // Ensure rotation around center
                                animate={{ rotate: 360 }}
                                transition={{ repeat: 3, duration: 1, ease: "linear" }}
                            >
                                <Avatar
                                    alt="My Image"
                                    src={user.avatar}
                                    sx={{ width: 120, height: 120 }}
                                />
                            </motion.div>
                            <Typography variant="subtitle1">
                                <Typical steps={[user.name, 1000]} loop={1} wrapper="span" />
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Drag & drop a new image here, or click to select
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={9} style={{ marginTop: "64px" }}>
                    <Fade top duration={5000}>
                        <Paper style={{ padding: 20 }}>
                            <Typography variant="subtitle1">
                                <strong>Name: </strong>
                                <Typical steps={[user.name, 1000]} loop={1} wrapper="span" />
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>School: </strong>
                                <Typical steps={[user.school, 1000]} loop={1} wrapper="span" />
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Date of Birth: </strong>
                                <Typical steps={[user.dob, 1000]} loop={1} wrapper="span" />
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Email: </strong>
                                <Typical steps={[user.email, 1000]} loop={1} wrapper="span" />
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Description: </strong>
                                <Typical steps={[user.description, 1000]} loop={1} wrapper="span" />
                            </Typography>
                        </Paper>
                    </Fade>
                </Grid>
                <Grid item xs={12}>
                    <Lottie options={{ loop: true, autoplay: true }} height={400} width={400} animationData={carAnimation} />
                </Grid>
            </Grid>
        </div>
    );
}

export default UserProfile;
