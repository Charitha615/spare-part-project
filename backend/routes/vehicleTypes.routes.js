module.exports = app => {
    const vehicleTypes = require('../controllers/vehicleTypes.controller.js');

    const router = require('express').Router();

    router.post('/upload', vehicleTypes.uploadImage, vehicleTypes.create);
    router.get('/', vehicleTypes.findAll);
    router.put('/:id', vehicleTypes.update);
    router.delete('/:id', vehicleTypes.delete);

    app.use('/api/vehicleTypes', router);
};
