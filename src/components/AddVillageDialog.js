import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Grid } from '@mui/material';

const AddVillageDialog = ({ open, onClose, onSubmit, village, onChange, onImageUpload, isUploading }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{village._id ? "Edit Village" : "Add Village"}</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Village Name"
                type="text"
                fullWidth
                value={village.name}
                onChange={onChange}
            />
            <TextField
                margin="dense"
                name="studentName"
                label="Student Name"
                type="text"
                fullWidth
                value={village.studentName}
                onChange={onChange}
            />
            <TextField
                margin="dense"
                name="district"
                label="District"
                type="text"
                fullWidth
                value={village.district}
                onChange={onChange}
            />
            <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                value={village.description}
                onChange={onChange}
            />
            <TextField
                margin="dense"
                name="map"
                label="Map URL"
                type="text"
                fullWidth
                value={village.map}
                onChange={onChange}
            />
            <Button
                variant="contained"
                component="label"
                style={{ margin: '10px 0' }}
            >
                {isUploading ? <CircularProgress size={24} /> : "Upload Images"}
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={onImageUpload}
                />
            </Button>
            <Grid container spacing={2}>
                {village?.gallery?.map((image, index) => (
                    <Grid item key={index}>
                        <img src={image?.imageUrl} alt={image?.caption || 'Gallery Image'} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                    </Grid>
                ))}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">Cancel</Button>
            <Button onClick={onSubmit} color="primary">{village._id ? "Save" : "Add"}</Button>
        </DialogActions>
    </Dialog>
);

export default AddVillageDialog;
