const SparePart = require('../models/sparePart.model.js');
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

exports.uploadImages = upload.array('images', 10); // Allow up to 10 images

exports.create = (req, res) => {
    if (!req.files) {
        return res.status(400).send({ message: 'No files uploaded!' });
    }

    const images = req.files.map(file => file.path);

    const sparePart = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        availableQuantity: req.body.availableQuantity,
        vehicleTypeId: req.body.vehicleTypeId,
        brandId: req.body.brandId
    };

    SparePart.create(sparePart, images, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Spare Part.'
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    SparePart.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving spare parts.'
            });
        else res.send(data);
    });
};

exports.findByVehicleTypeAndBrand = (req, res) => {
    SparePart.getByVehicleTypeAndBrand(req.params.vehicleTypeId, req.params.brandId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving spare parts.'
            });
        } else {
            res.send(data);
        }
    });
};


exports.findById = (req, res) => {
    SparePart.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Spare Part with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving Spare Part with id ' + req.params.id
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    SparePart.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Spare Part with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Could not delete Spare Part with id ' + req.params.id
                });
            }
        } else res.send({ message: 'Spare Part was deleted successfully!' });
    });
};


exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    SparePart.updateById(req.params.id, new SparePart(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Spare Part with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error updating Spare Part with id ' + req.params.id
                });
            }
        } else res.send(data);
    });
};

