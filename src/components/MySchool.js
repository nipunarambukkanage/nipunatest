import { Card, CardContent, CardMedia, Grid, Slider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slide from 'react-reveal/Slide';  // Import Slide from react-reveal

function MySchool(){
    const [sliderValue, setSliderValue] = useState(0);
    const [schoolImages, setSchoolImages] = useState(
        [
            "https://media.idownloadblog.com/wp-content/uploads/2010/09/Loading-Data.png",
            "https://media.idownloadblog.com/wp-content/uploads/2010/09/Loading-Data.png",
            "https://media.idownloadblog.com/wp-content/uploads/2010/09/Loading-Data.png"
        ]
    );

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    }

    useEffect(() => {
        const fetchSchoolData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_school_data');
                setSchoolImages(response?.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchSchoolData();
    }, []);

    return ( 
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6}>
                <Typography variant="h4" gutterBottom>My School</Typography>
                <Slider 
                    value={sliderValue} 
                    onChange={handleSliderChange} 
                    min={0} 
                    max={schoolImages.length - 1} 
                    step={1} 
                    marks 
                    valueLabelDisplay='auto' 
                    valueLabelFormat={(value) => value + 1} 
                />
                <Slide right>  {/* Wrap the Card with Slide for right-to-left effect */}
                    <Card>
                        <CardMedia 
                            component="img" 
                            alt={"School"} 
                            height="400" 
                            image={schoolImages[sliderValue]} 
                        />
                        <CardContent>
                            <Typography variant='h4'>
                                These are a few images of my School!
                            </Typography>
                            <Typography variant='h6'>
                                Add a description about your school
                            </Typography>
                        </CardContent>
                    </Card>
                </Slide>
            </Grid>
        </Grid>
    );
}

export default MySchool;
