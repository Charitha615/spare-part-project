const Checkout = require("../models/checkout.model");
const path = require("path");
const fs = require("fs");

exports.create = (req, res) => {


    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const bankZip = req.files?.bankZip;
    let bankZipPath = null;

    if (bankZip) {
        const uploadPath = path.join(__dirname, "../uploads/", bankZip.name);
        bankZip.mv(uploadPath, (err) => {
            if (err) return res.status(500).send(err);
        });
        bankZipPath = `uploads/${bankZip.name}`;
    }

    const checkout = new Checkout({
        userId: req.body.userId,
        total: req.body.total,
        paymentMethod: req.body.paymentMethod,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        company: req.body.company,
        address: req.body.address,
        apartment: req.body.apartment,
        city: req.body.city,
        postalCode: req.body.postalCode,
        phone: req.body.phone,
        status: 0,
        bankZip: bankZipPath
    });

    Checkout.create(checkout, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Checkout."
            });
        } else {
            let items;
            try {
                items = JSON.parse(req.body.items);
            } catch (parseError) {
                return res.status(400).send({
                    message: "Invalid JSON format for items."
                });
            }
            Checkout.createItems(data.id, items, (err, resItems) => {
                if (err) {
                    return res.status(500).send({
                        message: err.message || "Some error occurred while creating the Checkout Items."
                    });
                } else {
                    return res.send(data);
                }
            });
        }
    });
};


// Get all checkouts with their items
exports.getAll = (req, res) => {
    Checkout.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving checkouts."
            });
        else res.send(data);
    });
};


// Get all checkouts with status 0
exports.getAllStatusZero = (req, res) => {
    Checkout.getAllStatusZero((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving checkouts with status 0."
            });
        else res.send(data);
    });
};

// Count checkouts with status 0
exports.countStatusZero = (req, res) => {
    Checkout.countStatusZero((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while counting checkouts with status 0."
            });
        else res.send(data);
    });
};

// Update checkout status to 1
exports.updateStatusToOne = (req, res) => {
    Checkout.updateStatusToOne(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Checkout with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Checkout with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Get checkout by ID with its items and spare part names
exports.getById = (req, res) => {
    Checkout.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Checkout with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Checkout with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

