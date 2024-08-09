const Brand = require('../models/brand.model.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');

exports.create = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded!' });
    }

    const brand = {
        name: req.body.name,
        url: req.file.path,
        vehicleTypeId: req.body.vehicleTypeId
    };

    Brand.create(brand, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Brand.'
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Brand.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving brands.'
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded!' });
    }

    const brand = {
        name: req.body.name,
        url: req.file.path,
        vehicleTypeId: req.body.vehicleTypeId
    };

    Brand.updateById(req.params.id, brand, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Brand with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error updating Brand with id ' + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Brand.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Brand with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Could not delete Brand with id ' + req.params.id
                });
            }
        } else res.send({ message: `Brand was deleted successfully!` });
    });
};

exports.findByVehicleTypeId = (req, res) => {
    Brand.getByVehicleTypeId(req.params.vehicleTypeId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving brands.'
            });
        } else {
            res.send(data);
        }
    });
};

