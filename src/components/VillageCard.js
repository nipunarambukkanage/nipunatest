import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //

const VillageCard = ({ village, onEdit, onDelete }) => (
    <Card>
        <CardContent>
            <Typography variant="h5">{village?.name}</Typography>
            <Typography variant="subtitle1">{village?.studentName}</Typography>
            <Typography variant="subtitle2">{village?.district}</Typography>
            <Typography variant="body2">{village?.description}</Typography>
            <Carousel showArrows={true} showThumbs={false}>
                {village?.gallery?.map((image, index) => (
                    <div key={index}>
                        <img src={image?.imageUrl} alt={image?.caption
                            || 'Gallery Image'} style={{ maxHeight: 300, objectFit: 'cover' }} />
                        <p className="legend">{village?.description}</p>
                    </div>
                ))}
            </Carousel>
            <Typography variant="caption">{new Date(village?.addedDate).toLocaleDateString()}</Typography>
            <Button onClick={() => onEdit(village)}>Edit</Button>
            <Button onClick={() => onDelete(village._id)}>Delete</Button>
        </CardContent>
    </Card>
);

export default VillageCard;
