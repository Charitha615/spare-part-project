const User = require('../models/user.model.js');

exports.register = (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the User.'
            });
        else res.send(data);
    });
};

exports.login = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found User with email ${req.body.email}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving User with email ' + req.body.email
                });
            }
        } else {
            if (data.password === req.body.password) {
                res.send({ message: 'Login successful!', user: data });
            } else {
                res.status(401).send({ message: 'Invalid password!' });
            }
        }
    });
};
