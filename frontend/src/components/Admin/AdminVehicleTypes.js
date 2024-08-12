import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
// import { Edit } from '@mui/icons-material'; // Commenting out the Edit icon import
import { Delete } from '@mui/icons-material';
import Navigation from '../Navigation';
import Swal from 'sweetalert2';

const BASE_URL = "http://localhost:8080/api/vehicleTypes";
const IMAGE_BASE_URL = "http://localhost:8080";

function AdminVehicleTypes() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    useEffect(() => {
        fetchVehicleTypes();
    }, []);

    const fetchVehicleTypes = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setVehicleTypes(res.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch vehicle types.', 'error');
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const createOrUpdateVehicleType = async () => {
        if (!name.trim()) {
            Swal.fire('Validation Error', 'Vehicle Type Name is required', 'warning');
            return;
        }

        if (!image && !currentImageUrl) {
            Swal.fire('Validation Error', 'Image is required', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        } else if (currentImageUrl) {
            formData.append('url', currentImageUrl);
        }

        try {
            if (editId) {
                await axios.put(`${BASE_URL}/${editId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setEditId(null);
                setCurrentImageUrl('');
                Swal.fire('Success', 'Vehicle Type updated successfully', 'success');
            } else {
                await axios.post(`${BASE_URL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire('Success', 'Vehicle Type added successfully', 'success');
            }
            setName('');
            setImage(null);
            fetchVehicleTypes();
        } catch (error) {
            Swal.fire('Error', 'Failed to save vehicle type.', 'error');
        }
    };

    // Commenting out the edit function
    /*
    const editVehicleType = (id, name, url) => {
        setEditId(id);
        setName(name);
        setCurrentImageUrl(url);
    };
    */

    const deleteVehicleType = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${BASE_URL}/${id}`);
                fetchVehicleTypes();
                Swal.fire('Deleted!', 'Vehicle Type has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to delete vehicle type.', 'error');
            }
        }
    };

    return (
        <div>
            <Navigation />
            <Container>
                <Typography variant="h4" gutterBottom>Manage Vehicle Types</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Vehicle Type Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" color="primary" style={{ marginTop: 16 }}>
                                {image ? image.name : "Upload Picture"}
                            </Button>
                        </label>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createOrUpdateVehicleType}
                    style={{ marginTop: 16 }}
                >
                    {editId ? 'Update' : 'Add'}
                </Button>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vehicleTypes.map((type) => (
                                <TableRow key={type.id}>
                                    <TableCell>{type.name}</TableCell>
                                    <TableCell>
                                        <img src={`${IMAGE_BASE_URL}/${type.url}`} alt={type.name} width={50} height={50} />
                                    </TableCell>
                                    <TableCell>
                                        {/* Commented out the Edit button */}
                                        {/* <IconButton onClick={() => editVehicleType(type.id, type.name, type.url)} color="primary">
                                            <Edit />
                                        </IconButton> */}
                                        <IconButton onClick={() => deleteVehicleType(type.id)} color="secondary">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default AdminVehicleTypes;
