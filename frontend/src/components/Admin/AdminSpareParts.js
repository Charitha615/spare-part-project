import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Grid, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
// import { Edit } from '@mui/icons-material'; // Commenting out the Edit icon import
import { Delete } from '@mui/icons-material';
import Navigation from '../Navigation';
import Swal from 'sweetalert2';

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
        try {
            const res = await axios.get(BASE_URL);
            setSpareParts(res.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch spare parts.', 'error');
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

    const fetchBrands = async () => {
        try {
            const res = await axios.get(BRANDS_URL);
            setBrands(res.data);
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch brands.', 'error');
        }
    };

    const handleImagesChange = (e) => {
        setImages([...e.target.files]);
    };

    const createOrUpdateSparePart = async () => {
        if (!name.trim()) {
            Swal.fire('Validation Error', 'Spare Part Name is required', 'warning');
            return;
        }

        if (!price.trim()) {
            Swal.fire('Validation Error', 'Price is required', 'warning');
            return;
        }

        if (!category.trim()) {
            Swal.fire('Validation Error', 'Category is required', 'warning');
            return;
        }

        if (!availableQuantity.trim()) {
            Swal.fire('Validation Error', 'Available Quantity is required', 'warning');
            return;
        }

        if (!selectedVehicleType) {
            Swal.fire('Validation Error', 'Vehicle Type is required', 'warning');
            return;
        }

        if (!selectedBrand) {
            Swal.fire('Validation Error', 'Brand is required', 'warning');
            return;
        }

        if (images.length === 0) {
            Swal.fire('Validation Error', 'At least one image is required', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('availableQuantity', availableQuantity);
        formData.append('vehicleTypeId', selectedVehicleType);
        formData.append('brandId', selectedBrand);
        images.forEach(image => formData.append('images', image));

        try {
            if (editId) {
                await axios.put(`${BASE_URL}/${editId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setEditId(null);
                Swal.fire('Success', 'Spare part updated successfully', 'success');
            } else {
                await axios.post(`${BASE_URL}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire('Success', 'Spare part added successfully', 'success');
            }
            clearForm();
            fetchSpareParts();
        } catch (error) {
            Swal.fire('Error', 'Failed to save spare part.', 'error');
        }
    };

    // Commenting out the edit function
    /*
    const editSparePart = (sparePart) => {
        setEditId(sparePart.id);
        setName(sparePart.name);
        setPrice(sparePart.price);
        setCategory(sparePart.category);
        setAvailableQuantity(sparePart.availableQuantity);
        setSelectedVehicleType(sparePart.vehicleTypeId);
        setSelectedBrand(sparePart.brandId);
    };
    */

    const deleteSparePart = async (id) => {
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
                fetchSpareParts();
                Swal.fire('Deleted!', 'Spare part has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to delete spare part.', 'error');
            }
        }
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
                                        {/* Commented out the Edit button */}
                                        {/* <IconButton onClick={() => editSparePart(sparePart)} color="primary">
                                            <Edit />
                                        </IconButton> */}
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
