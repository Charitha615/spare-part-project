module.exports = app => {
    const spareParts = require('../controllers/sparePart.controller.js');

    const router = require('express').Router();

    router.post('/upload', spareParts.uploadImages, spareParts.create);
    router.get('/', spareParts.findAll);
    router.get('/vehicleType/:vehicleTypeId/brand/:brandId', spareParts.findByVehicleTypeAndBrand);
    router.get('/:id', spareParts.findById);
    router.delete('/:id', spareParts.delete);
    router.put('/:id', spareParts.update);


    app.use('/api/spareParts', router);
};
