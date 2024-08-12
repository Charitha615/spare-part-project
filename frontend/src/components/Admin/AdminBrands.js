import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { Edit } from '@mui/icons-material'; // Commenting out the Edit icon import
import { Delete } from '@mui/icons-material';
import Navigation from '../Navigation';
import Swal from 'sweetalert2';

const BASE_URL = "http://localhost:8080/api/brands";
const IMAGE_BASE_URL = "http://localhost:8080";
const VEHICLE_TYPES_URL = "http://localhost:8080/api/vehicleTypes";

function AdminBrands() {
    const [brands, setBrands] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [brandName, setBrandName] = useState('');
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    useEffect(() => {
        fetchBrands();
        fetchVehicleTypes();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setBrands(res.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch brands.', 'error');
        }
    };

    const fetchVehicleTypes = async () => {
        try {
            const res = await axios.get(VEHICLE_TYPES_URL);
            setVehicleTypes(res.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch vehicle types.', 'error');
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const createOrUpdateBrand = async () => {
        if (!brandName.trim()) {
            Swal.fire('Validation Error', 'Brand Name is required', 'warning');
            return;
        }

        if (!selectedVehicleType) {
            Swal.fire('Validation Error', 'Vehicle Type is required', 'warning');
            return;
        }

        if (!image && !currentImageUrl) {
            Swal.fire('Validation Error', 'Image is required', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('vehicleTypeId', selectedVehicleType);
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
                Swal.fire('Success', 'Brand updated successfully', 'success');
            } else {
                await axios.post(`${BASE_URL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire('Success', 'Brand added successfully', 'success');
            }
            setBrandName('');
            setSelectedVehicleType('');
            setImage(null);
            fetchBrands();
        } catch (error) {
            Swal.fire('Error', 'Failed to save brand.', 'error');
        }
    };

    // Commenting out the edit function
    /*
    const editBrand = (id, name, vehicleTypeId, url) => {
        setEditId(id);
        setBrandName(name);
        setSelectedVehicleType(vehicleTypeId);
        setCurrentImageUrl(url);
    };
    */

    const deleteBrand = async (id) => {
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
                fetchBrands();
                Swal.fire('Deleted!', 'Brand has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to delete brand.', 'error');
            }
        }
    };

    return (
        <div>
            <Navigation />
            <Container>
                <Typography variant="h4" gutterBottom>Manage Brands</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="vehicle-type-select-label">Vehicle Type</InputLabel>
                            <Select
                                labelId="vehicle-type-select-label"
                                value={selectedVehicleType}
                                onChange={(e) => setSelectedVehicleType(e.target.value)}
                                label="Vehicle Type"
                            >
                                {vehicleTypes.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Brand Name"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
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
                                Upload Picture
                            </Button>
                        </label>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createOrUpdateBrand}
                    style={{ marginTop: 16 }}
                >
                    {editId ? 'Update' : 'Add'}
                </Button>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Brand Name</TableCell>
                                <TableCell>Vehicle Type</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell>{brand.name}</TableCell>
                                    <TableCell>{vehicleTypes.find((type) => type.id === brand.vehicleTypeId)?.name}</TableCell>
                                    <TableCell>
                                        <img src={`${IMAGE_BASE_URL}/${brand.url}`} alt={brand.name} width={50} height={50} />
                                    </TableCell>
                                    <TableCell>
                                        {/* Commented out the Edit button */}
                                        {/* <IconButton onClick={() => editBrand(brand.id, brand.name, brand.vehicleTypeName, brand.url)} color="primary">
                                            <Edit />
                                        </IconButton> */}
                                        <IconButton onClick={() => deleteBrand(brand.id)} color="secondary">
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

export default AdminBrands;
