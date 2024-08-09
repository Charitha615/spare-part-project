const VehicleType = require('../models/vehicleTypes.model.js');
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
  const vehicleType = {
    name: req.body.name,
    url: req.file.path
  };

  VehicleType.create(vehicleType, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the VehicleType.'
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  VehicleType.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving vehicle types.'
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  const vehicleType = {
    name: req.body.name,
    url: req.body.url
  };

  VehicleType.updateById(req.params.id, vehicleType, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found VehicleType with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Error updating VehicleType with id ' + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  VehicleType.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found VehicleType with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete VehicleType with id ' + req.params.id
        });
      }
    } else res.send({ message: `VehicleType was deleted successfully!` });
  });
};
