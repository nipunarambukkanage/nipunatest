import { Button, Card, CardContent, Divider, Grid, Paper, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VillageCard = ({ village, onEdit, onDelete }) => (
    <Card>
        <CardContent>
            <Typography variant="h5">{village.name}</Typography>
            <Typography variant="subtitle1">{village.studentName}</Typography>
            <Typography variant="subtitle2">{village.district}</Typography>
            <Typography variant="body2">{village.description}</Typography>
            <Typography variant="caption">{new Date(village.addedDate).toLocaleDateString()}</Typography>
            <Button onClick={() => onEdit(village)}>Edit</Button>
            <Button onClick={() => onDelete(village._id)}>Delete</Button>
        </CardContent>
    </Card>
);

const MyVillages = () => {
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

    const fetchVillages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/villages');
            setVillages(response.data);
        } catch (error) {
            console.error("Error fetching village data:", error);
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
        // Logic to edit a village
    };

    const handleDelete = async (villageId) => {
        try {
            await axios.delete(`http://localhost:5000/villages/${villageId}`);
            fetchVillages();
        } catch (error) {
            console.error("Error deleting village:", error);
        }
    };

    const handleClickOpen = () => {
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
        try {
            await axios.post('http://localhost:5000/villages', newVillage);
            fetchVillages();
            handleClose();
        } catch (error) {
            console.error("Error adding village:", error);
        }
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Village</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Village Name"
                        type="text"
                        fullWidth
                        value={newVillage.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="studentName"
                        label="Student Name"
                        type="text"
                        fullWidth
                        value={newVillage.studentName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="district"
                        label="District"
                        type="text"
                        fullWidth
                        value={newVillage.district}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={newVillage.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="map"
                        label="Map URL"
                        type="text"
                        fullWidth
                        value={newVillage.map}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleAddVillage} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default MyVillages;
