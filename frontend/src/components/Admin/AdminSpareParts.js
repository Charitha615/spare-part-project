import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Grid, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Navigation from '../Navigation';

const BASE_URL = "http://localhost:8080/api/spareParts";
const VEHICLE_TYPES_URL = "http://localhost:8080/api/vehicleTypes";
const BRANDS_URL = "http://localhost:8080/api/brands";

function AdminSpareParts() {
    const [spareParts, setSpareParts] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [images, setImages] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSpareParts();
        fetchVehicleTypes();
        fetchBrands();
    }, []);

    const fetchSpareParts = async () => {
        const res = await axios.get(BASE_URL);
        setSpareParts(res.data);
    };

    const fetchVehicleTypes = async () => {
        const res = await axios.get(VEHICLE_TYPES_URL);
        setVehicleTypes(res.data);
    };

    const fetchBrands = async () => {
        const res = await axios.get(BRANDS_URL);
        setBrands(res.data);
    };

    const handleImagesChange = (e) => {
        setImages([...e.target.files]);
    };

    const createOrUpdateSparePart = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('availableQuantity', availableQuantity);
        formData.append('vehicleTypeId', selectedVehicleType);
        formData.append('brandId', selectedBrand);
        images.forEach(image => formData.append('images', image));

        if (editId) {
            
            await axios.put(`${BASE_URL}/${editId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditId(null);

        } else {
            await axios.post(`${BASE_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        clearForm();
        fetchSpareParts();
    };

    const editSparePart = (sparePart) => {
        setEditId(sparePart.id);
        setName(sparePart.name);
        setPrice(sparePart.price);
        setCategory(sparePart.category);
        setAvailableQuantity(sparePart.availableQuantity);
        setSelectedVehicleType(sparePart.vehicleTypeId);
        setSelectedBrand(sparePart.brandId);
    };

    const deleteSparePart = async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        fetchSpareParts();
    };

    const clearForm = () => {
        setName('');
        setPrice('');
        setCategory('');
        setAvailableQuantity('');
        setSelectedVehicleType('');
        setSelectedBrand('');
        setImages([]);
    };

    return (
        <div>
            <Navigation />
            <Container>
                <Typography variant="h4" gutterBottom>Manage Spare Parts</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Spare Part Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Available Quantity"
                            value={availableQuantity}
                            onChange={(e) => setAvailableQuantity(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
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
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="brand-select-label">Brand</InputLabel>
                            <Select
                                labelId="brand-select-label"
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                label="Brand"
                            >
                                {brands.map((brand) => (
                                    <MenuItem key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            multiple
                            onChange={handleImagesChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" color="primary" style={{ marginTop: 16 }}>
                                Upload Pictures
                            </Button>
                        </label>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={createOrUpdateSparePart}
                    style={{ marginTop: 16 }}
                >
                    {editId ? 'Update' : 'Add'}
                </Button>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Available Quantity</TableCell>
                                <TableCell>Vehicle Type</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Images</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {spareParts.map((sparePart) => (
                                <TableRow key={sparePart.id}>
                                    <TableCell>{sparePart.name}</TableCell>
                                    <TableCell>{sparePart.price}</TableCell>
                                    <TableCell>{sparePart.category}</TableCell>
                                    <TableCell>{sparePart.availableQuantity}</TableCell>
                                    <TableCell>{vehicleTypes.find((type) => type.id === sparePart.vehicleTypeId)?.name}</TableCell>
                                    <TableCell>{brands.find((brand) => brand.id === sparePart.brandId)?.name}</TableCell>
                                    <TableCell>
                                        {sparePart.images.map((image, index) => (
                                            <img key={index} src={`http://localhost:8080/${image}`} alt={sparePart.name} width={50} height={50} />
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => editSparePart(sparePart)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => deleteSparePart(sparePart.id)} color="secondary">
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

export default AdminSpareParts;
