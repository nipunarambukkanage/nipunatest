import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
};

const VillageCard = ({ village, onEdit, onDelete }) => (
    <Card>
        <CardContent>
            <Typography variant="h5">{village?.name}</Typography>
            <Typography variant="subtitle1">{village?.studentName}</Typography>
            <Typography variant="subtitle2">{village?.district}</Typography>
            <Typography variant="body2">{village?.description}</Typography>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {village?.gallery?.map((image, index) => (
                    <div key={index} style={{ marginBottom: '16px', position: 'relative' }}>
                        <img 
                            src={image?.imageUrl} 
                            alt={image?.caption || 'Gallery Image'} 
                            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
                        />
                        <Typography
                            variant="caption"
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: '#fff',
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                padding: '5px 10px',
                                borderRadius: '5px',
                            }}
                        >
                            {image?.caption || 'No caption available'}
                        </Typography>
                    </div>
                ))}
            </Masonry>

            <Typography variant="caption">{new Date(village?.addedDate).toLocaleDateString()}</Typography>
            <Button onClick={() => onEdit(village)}>Edit</Button>
            <Button onClick={() => onDelete(village._id)}>Delete</Button>
        </CardContent>
    </Card>
);

export default VillageCard;