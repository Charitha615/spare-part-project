import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Navigation from '../Navigation';

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
        const res = await axios.get(BASE_URL);
        console.log(res.data);
        setBrands(res.data);
    };

    const fetchVehicleTypes = async () => {
        const res = await axios.get(VEHICLE_TYPES_URL);
        setVehicleTypes(res.data);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const createOrUpdateBrand = async () => {
        const formData = new FormData();
        formData.append('name', brandName);
        formData.append('vehicleTypeId', selectedVehicleType);
        if (image) {
            formData.append('image', image);
        } else if (currentImageUrl) {
            formData.append('url', currentImageUrl);
        }

        if (editId) {
            await axios.put(`${BASE_URL}/${editId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditId(null);
            setCurrentImageUrl('');
        } else {
            await axios.post(`${BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        setBrandName('');
        setSelectedVehicleType('');
        setImage(null);
        fetchBrands();
    };

    const editBrand = (id, name, vehicleTypeId, url) => {
        // alert(id);
        setEditId(id);
        setBrandName(name);
        setSelectedVehicleType(vehicleTypeId);
        setCurrentImageUrl(url);
    };

    const deleteBrand = async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        fetchBrands();
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
                                        <IconButton onClick={() => editBrand(brand.id, brand.name, brand.vehicleTypeName, brand.url)} color="primary">
                                            <Edit />
                                        </IconButton>
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
