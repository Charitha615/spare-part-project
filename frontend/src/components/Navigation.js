// Navigation.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
}));

function Navigation() {
    const classes = useStyles();

    const handleLogout = () => {
        localStorage.clear(); // Clear all localStorage items
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/AdminDashboard" className={classes.title}>
                        Admin Dashboard
                    </Typography>
                    <Button color="inherit" component={Link} to="/vehicle-types" className={classes.link}>
                        Vehicle Types
                    </Button>
                    <Button color="inherit" component={Link} to="/AdminBrands" className={classes.link}>
                        Brands
                    </Button>
                    <Button color="inherit" component={Link} to="/spare-parts" className={classes.link}>
                        Spare Parts
                    </Button>
                    <Button color="inherit" component={Link} to="/" className={classes.link} onClick={handleLogout}>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navigation;
