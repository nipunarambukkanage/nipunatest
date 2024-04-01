import { Card, CardContent, CardMedia, Grid, Slider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const schoolImages = [
    "https://alchetron.com/cdn/ananda-college-4eb9b260-59bb-443e-835a-96b48151157-resize-750.png",
    "https://images6.fanpop.com/image/photos/36800000/School-image-school-36812026-3888-2592.jpg",
    "https://cdnassets.hw.net/b6/7d/95e393ff4c8296702e5e63979e3e/40b17d69b0b2434486fc7f485d3f44fc.jpg"
];
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
        const fetchSchoolData = async ()=>{
            try{
                const response = await axios.get('http://localhost:5000/get_school_data');
                setSchoolImages(response?.data);
            }catch(error){
                console.error("Error fetching user data : ", error);
            }
        };

        fetchSchoolData();
    }, []);

    return ( 
   <Grid container spacing={3} justifyContent="center" alignItems="center">
    <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h4" gutterBottom></Typography>
        <Slider value={sliderValue} onChange={handleSliderChange} min={0} max={schoolImages.length-1} step={1}
        marks valueLabelDisplay='auto' valueLabelFormat={(value)=> value+1} />
        <Card>
            <CardMedia component="img" alt={"School"} height="400" image={schoolImages[sliderValue]} />
            <CardContent>
                <Typography variant='h4'>These are few images of my School!</Typography>
                <Typography variant='h6'>Add a description about your school</Typography>
            </CardContent>
        </Card>
    </Grid>
   </Grid>
    );
}
export default MySchool;