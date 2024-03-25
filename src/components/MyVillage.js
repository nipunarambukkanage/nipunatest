import { Card, CardContent, CardMedia, Divider, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MyVillage = () => {

    const [villageInfo, setVillageInfo] = useState(
        {
            name: "Loading Village...",
            title: "Loading Village...",
            description: "Loading Village Discription... Hang on for a moment.....",
            gallery: [
                { id: 1, imageUrl: '', caption: 'Loading Village Images...' },
                { id: 2, imageUrl: '', caption: 'Loading Village Images...' },
                { id: 3, imageUrl: '', caption: 'Loading Village Images...' },
            ],
            map: ""
        }
    );

    useEffect(() => {
        const fetchVillageData = async ()=>{
            try{
                const response = await axios.get('http://localhost:5000/get_village_data');
                setVillageInfo(response?.data);
            }catch(error){
                console.error("Error fetching user data : ", error);
            }
        };

        fetchVillageData();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        {villageInfo.title} is {villageInfo.name}
                    </Typography>
                    <Divider style={{ margin: '10px 0' }} />
                    <Typography variant="body1" >
                        {villageInfo.description}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h5" gutterBottom>
                        Here is my location!
                    </Typography>
                    <iframe src={villageInfo.map} width="400" height="300" allowfullscreen="" loading="lazy" ></iframe>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Image Gallery
                </Typography>
                <Grid container spacing={2}>
                    {villageInfo.gallery.map((image) => (
                        <Grid item xs={12} sm={6} md={4} key={image.id}>
                            <Card>
                                <CardMedia component="img" height="140" image={image.imageUrl} alt={image.caption} />
                                <CardContent>
                                    <Typography variant="caption" color="textSecondary">
                                        {image.caption}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

        </Grid>
    );
};

export default MyVillage;