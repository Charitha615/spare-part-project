import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import notificationGif from './gif.gif';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Grid,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Badge,
    Button,
    Modal,
    Box,
    Card,
    CardContent
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Navigation from '../Navigation';
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/vehicleTypes";
const BASE_URL_BRAND = "http://localhost:8080/api/brands";
const BASE_URL_spareParts = "http://localhost:8080/api/spareParts";
const CHECKOUT_URL = "http://localhost:8080/api/checkout";
const IMAGE_BASE_URL = "http://localhost:8080";


const useStyles = makeStyles((theme) => ({
    sidebar: {
        padding: '16px',
        textAlign: 'center',
        color: '#000',  // Adjust this to match your theme's text color
    },
    notificationIcon: {
        width: 80,
        height: 60,
    },
    root: {
        flexGrow: 1,
        padding: '16px',
    },
    card: {
        marginBottom: '16px',
    },
    mainGrid: {
        marginTop: '24px',
    },
    // sidebar: {
    //     padding: '16px',
    //     backgroundColor: '#f5f5f5',
    // },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        boxShadow: 24,
        padding: '16px',
    },
    table: {
        minWidth: 650,
    },
    tableRow: {
        // '&:nth-of-type(odd)': {
        //     backgroundColor: theme.palette.action.hover,
        // },
        // '&:hover': {
        //     backgroundColor: theme.palette.action.focus,
        // },
    },
    tableCell: {
        padding: '12px',
    },
    image: {
        width: 50,
        height: 50,
    },
}));

function AdminDashboard() {
    const classes = useStyles();
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [spareParts, setSpareParts] = useState([]);
    const [unreadOrdersCount, setUnreadOrdersCount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchVehicleTypes();
        fetchBrands();
        fetchSpareParts();
        fetchUnreadOrdersCount();
        fetchOrders();
    }, []);

    const fetchVehicleTypes = async () => {
        const res = await axios.get(BASE_URL);
        setVehicleTypes(res.data);
    };

    const fetchBrands = async () => {
        const res = await axios.get(BASE_URL_BRAND);
        setBrands(res.data);
    };

    const fetchSpareParts = async () => {
        const res = await axios.get(BASE_URL_spareParts);
        setSpareParts(res.data);
    };

    const fetchUnreadOrdersCount = async () => {
        const res = await axios.get(`${CHECKOUT_URL}/count/status/0`);
        setUnreadOrdersCount(res.data.count);
    };

    const fetchOrders = async () => {
        const res = await axios.get(CHECKOUT_URL);
        setOrders(res.data);
    };

    const handleOrderClick = async (orderId) => {
        const res = await axios.get(`${CHECKOUT_URL}/${orderId}`);
        setSelectedOrder(res.data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    const markOrderAsRead = async (orderId) => {
        await axios.put(`${CHECKOUT_URL}/status/1/${orderId}`);
        fetchUnreadOrdersCount();
        fetchOrders();
    };

    return (
        <div>
            <Navigation />
            <Container className={classes.root}>
                <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                <Grid container spacing={4} className={classes.mainGrid}>
                    <Grid item xs={12} md={8}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Management Sections</Typography>
                                <List>
                                    <ListItem button component={Link} to="/vehicle-types">
                                        <ListItemText primary="Manage Vehicle Types" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/AdminBrands">
                                        <ListItemText primary="Manage Brands" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/spare-parts">
                                        <ListItemText primary="Manage Spare Parts" />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper className={classes.sidebar}>
                            <Typography variant="h6">
                                New Orders
                                <Badge
                                    style={{ marginLeft: 20 }}
                                    badgeContent={unreadOrdersCount}
                                    color="secondary"
                                >
                                    <img
                                        src={notificationGif}
                                        alt="Notification Icon"
                                        className={classes.notificationIcon}
                                    />
                                </Badge>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Typography variant="h5" gutterBottom style={{ marginTop: 70 }}>Orders</Typography>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Order ID</TableCell>
                                <TableCell className={classes.tableCell}>User ID</TableCell>
                                <TableCell className={classes.tableCell}>Total</TableCell>
                                <TableCell className={classes.tableCell}>Status</TableCell>
                                <TableCell className={classes.tableCell}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className={classes.tableRow}>
                                    <TableCell className={classes.tableCell}>{order.id}</TableCell>
                                    <TableCell className={classes.tableCell}>{order.userId}</TableCell>
                                    <TableCell className={classes.tableCell}>${order.total}</TableCell>
                                    <TableCell className={classes.tableCell}>{order.status === 0 ? 'Unread' : 'Read'}</TableCell>
                                    <TableCell className={classes.tableCell}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOrderClick(order.id)}
                                        >
                                            View Details
                                        </Button>
                                        {order.status === 0 && (
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => markOrderAsRead(order.id)}
                                                style={{ marginLeft: 10 }}
                                            >
                                                Mark as Read
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {selectedOrder && (
                    <Modal open={open} onClose={handleClose}>
                        <Box className={classes.modal}>
                            <Typography variant="h6" gutterBottom>Order Details</Typography>
                            <Typography variant="body1"><strong>Order ID:</strong> {selectedOrder.id}</Typography>
                            <Typography variant="body1"><strong>User ID:</strong> {selectedOrder.userId}</Typography>
                            <Typography variant="body1"><strong>Total:</strong> ${selectedOrder.total}</Typography>
                            <Typography variant="body1"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</Typography>
                            <Typography variant="body1"><strong>Status:</strong> {selectedOrder.status === 0 ? 'Unread' : 'Read'}</Typography>
                            <Typography variant="body1"><strong>Items:</strong></Typography>
                            <ul>
                                {selectedOrder.items.map((item, index) => (
                                    <li key={index}>Spare Part :<strong>{item.sparePartName} </strong> , Quantity: <strong>{item.quantity} </strong></li>
                                ))}
                            </ul>
                            <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                        </Box>
                    </Modal>
                )}

                <Typography variant="h5" gutterBottom style={{ marginTop: 70 }}>Vehicle Type Sections</Typography>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Name</TableCell>
                                <TableCell className={classes.tableCell}>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vehicleTypes.map((type) => (
                                <TableRow key={type.id} className={classes.tableRow}>
                                    <TableCell className={classes.tableCell}>{type.name}</TableCell>
                                    <TableCell className={classes.tableCell}>
                                        <img src={`${IMAGE_BASE_URL}/${type.url}`} alt={type.name} className={classes.image} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="h5" gutterBottom style={{ marginTop: 70 }}>Brands Sections</Typography>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Brand Name</TableCell>
                                <TableCell className={classes.tableCell}>Vehicle Type</TableCell>
                                <TableCell className={classes.tableCell}>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.map((brand) => (
                                <TableRow key={brand.id} className={classes.tableRow}>
                                    <TableCell className={classes.tableCell}>{brand.name}</TableCell>
                                    <TableCell className={classes.tableCell}>{vehicleTypes.find((type) => type.id === brand.vehicleTypeId)?.name}</TableCell>
                                    <TableCell className={classes.tableCell}>
                                        <img src={`${IMAGE_BASE_URL}/${brand.url}`} alt={brand.name} className={classes.image} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="h5" gutterBottom style={{ marginTop: 70 }}>Spare Part Sections</Typography>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>Name</TableCell>
                                <TableCell className={classes.tableCell}>Price</TableCell>
                                <TableCell className={classes.tableCell}>Category</TableCell>
                                <TableCell className={classes.tableCell}>Available Quantity</TableCell>
                                <TableCell className={classes.tableCell}>Vehicle Type</TableCell>
                                <TableCell className={classes.tableCell}>Brand</TableCell>
                                <TableCell className={classes.tableCell}>Images</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {spareParts.map((sparePart) => (
                                <TableRow key={sparePart.id} className={classes.tableRow}>
                                    <TableCell className={classes.tableCell}>{sparePart.name}</TableCell>
                                    <TableCell className={classes.tableCell}>{sparePart.price}</TableCell>
                                    <TableCell className={classes.tableCell}>{sparePart.category}</TableCell>
                                    <TableCell className={classes.tableCell}>{sparePart.availableQuantity}</TableCell>
                                    <TableCell className={classes.tableCell}>{vehicleTypes.find((type) => type.id === sparePart.vehicleTypeId)?.name}</TableCell>
                                    <TableCell className={classes.tableCell}>{brands.find((brand) => brand.id === sparePart.brandId)?.name}</TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {sparePart.images.map((image, index) => (
                                            <img key={index} src={`${IMAGE_BASE_URL}/${image}`} alt={sparePart.name} className={classes.image} />
                                        ))}
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

export default AdminDashboard;
