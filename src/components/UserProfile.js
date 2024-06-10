import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState({
        name: 'No data came from backend',
        school: 'No data came from backend',
        dob: 'No data came from backend',
        email: 'No data came from backend',
        description: 'No data came from backend',
        hobby: 'No data came from backend',
        hometown: 'No data came from backend',
        age: 'No data came from backend',
        phone: 'No data came from backend',
        ambition: 'No data came from backend',
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

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3} style={{ marginTop: "64px" }}>
                <Paper style={{ padding: 20, textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <div {...getRootProps()} style={{ cursor: 'pointer' }}>
                        <input {...getInputProps()} />
                        <Avatar
                            alt="My Image"
                            src={user.avatar}
                            sx={{ width: 120, height: 120 }}
                        />
                        <Typography variant="subtitle1">
                            {user.name}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            Drag & drop a new image here, or click to select
                        </Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9} style={{ marginTop: "64px" }}>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="subtitle1">
                        <strong>Name: </strong> {user?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>School: </strong> {user?.school}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Date of Birth: </strong> {user?.dob}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Email: </strong> {user?.email}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Description: </strong> {user?.description}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default UserProfile;
