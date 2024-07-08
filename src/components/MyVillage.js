import { Button, Card, CardContent, Divider, Grid, Paper, Typography, Snackbar, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddVillageDialog from './AddVillageDialog';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from 'react-responsive-carousel'; 
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
                        <img src={image?.imageUrl} alt={image?.caption || 'Gallery Image'} style={{ maxHeight: 300, objectFit: 'cover' }} />
                        <p className="legend">{image?.caption}</p>
                    </div>
                ))}
            </Carousel>
            <Typography variant="caption">{new Date(village?.addedDate).toLocaleDateString()}</Typography>
            <Button onClick={() => onEdit(village)}>Edit</Button>
            <Button onClick={() => onDelete(village._id)}>Delete</Button>
        </CardContent>
    </Card>
);

const MyVillage = () => {
    const [villages, setVillages] = useState([]);
    const [currentVillageIndex, setCurrentVillageIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [newVillage, setNewVillage] = useState({
        name: '',
        studentName: '',
        district: '',
        description: '',
        gallery: [],
        map: ''
    });
    const [isUploading, setIsUploading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const fetchVillages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/villages');
            setVillages(response.data);
        } catch (error) {
            setSnackbarMessage("Error fetching village data");
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        fetchVillages();
    }, []);

    const handleNext = () => {
        setCurrentVillageIndex((prevIndex) => (prevIndex + 1) % villages.length);
    };

    const handlePrevious = () => {
        setCurrentVillageIndex((prevIndex) => (prevIndex - 1 + villages.length) % villages.length);
    };

    const handleEdit = (village) => {
        setNewVillage(village);
        setOpen(true);
    };

    const handleDelete = async (villageId) => {
        try {
            await axios.delete(`http://localhost:5000/villages/${villageId}`);
            fetchVillages();
        } catch (error) {
            setSnackbarMessage("Error deleting village");
            setSnackbarOpen(true);
        }
    };

    const handleClickOpen = () => {
        setNewVillage({
            name: '',
            studentName: '',
            district: '',
            description: '',
            gallery: [],
            map: ''
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVillage({ ...newVillage, [name]: value });
    };

    const handleAddVillage = async () => {
        if (!newVillage.name || !newVillage.studentName || !newVillage.district || !newVillage.description) {
            setSnackbarMessage("Please fill in all required fields");
            setSnackbarOpen(true);
            return;
        }

        try {
            if (newVillage._id) {
                await axios.put(`http://localhost:5000/villages/${newVillage._id}`, newVillage);
            } else {
                await axios.post('http://localhost:5000/villages', newVillage);
            }
            fetchVillages();
            handleClose();
        } catch (error) {
            setSnackbarMessage("Error adding/updating village");
            setSnackbarOpen(true);
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setIsUploading(true);

        const uploadPromises = files.map(file => {
            const formData = new FormData();
            formData.append('image', file);

            return axios.post('https://api.imgbb.com/1/upload?key=30f74123f52909ae39cad7541ab440a7', formData);
        });

        try {
            const responses = await Promise.all(uploadPromises);
            const gallery = responses.map(response => ({
                id: Date.now() + Math.random(), // generate unique ID
                imageUrl: response.data.data.url,
                caption: ''
            }));
            setNewVillage(prevVillage => ({
                ...prevVillage,
                gallery: [...prevVillage.gallery, ...gallery]
            }));
            setSnackbarMessage("Images uploaded successfully");
        } catch (error) {
            setSnackbarMessage("Error uploading images");
        } finally {
            setIsUploading(false);
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const currentVillage = villages[currentVillageIndex] || {};

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h5">Village Information</Typography>
                    <Divider style={{ margin: '10px 0' }} />
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Village</Button>
                    <VillageCard
                        village={currentVillage}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <Button onClick={handlePrevious}>Previous</Button>
                    <Button onClick={handleNext}>Next</Button>
                </Paper>
            </Grid>

            <AddVillageDialog
                open={open}
                onClose={handleClose}
                onSubmit={handleAddVillage}
                village={newVillage}
                onChange={handleChange}
                onImageUpload={handleImageUpload}
                isUploading={isUploading}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Grid>
    );
};

export default MyVillage;
