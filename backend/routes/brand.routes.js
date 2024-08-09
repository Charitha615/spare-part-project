module.exports = app => {
    const brands = require('../controllers/brand.controller.js');

    const router = require('express').Router();

    router.post('/upload', brands.uploadImage, brands.create);
    router.get('/', brands.findAll);
    router.get('/vehicleType/:vehicleTypeId', brands.findByVehicleTypeId); // New route
    router.put('/:id', brands.uploadImage, brands.update);
    router.delete('/:id', brands.delete);

    app.use('/api/brands', router);
};
