const users = require("../controllers/user.controller");
module.exports = app => {
    const checkouts = require("../controllers/checkout.controller");

    const router = require('express').Router();

    router.post("/", checkouts.create);
    router.get("/", checkouts.getAll);
    router.get("/status/0", checkouts.getAllStatusZero);
    router.get("/count/status/0", checkouts.countStatusZero);
    router.put("/status/1/:id", checkouts.updateStatusToOne);
    router.get("/:id", checkouts.getById);

    app.use('/api/checkout', router);
};
