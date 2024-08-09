const sql = require('../config/db.config.js');

const Checkout = function(checkout) {
    this.userId = checkout.userId;
    this.total = checkout.total;
    this.paymentMethod = checkout.paymentMethod;
    this.firstName = checkout.firstName;
    this.lastName = checkout.lastName;
    this.company = checkout.company;
    this.address = checkout.address;
    this.apartment = checkout.apartment;
    this.city = checkout.city;
    this.postalCode = checkout.postalCode;
    this.phone = checkout.phone;
    this.bankZip = checkout.bankZip;
    this.status = checkout.status;
};

Checkout.create = (newCheckout, result) => {
    sql.query("INSERT INTO checkouts SET ?", newCheckout, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, { id: res.insertId, ...newCheckout });
    });
};

Checkout.createItems = (checkoutId, items, result) => {
    const values = items.map(item => [checkoutId, item.itemId, item.quantity]);
    sql.query("INSERT INTO checkoutItems (checkoutId, sparePartId, quantity) VALUES ?", [values], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

// Fetch all checkouts with their items
Checkout.getAll = (result) => {
    const query = `
        SELECT c.*, ci.sparePartId, ci.quantity 
        FROM checkouts c 
        LEFT JOIN checkoutItems ci ON c.id = ci.checkoutId
    `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Process data to combine checkout items under their respective checkout
        const checkouts = {};
        res.forEach(row => {
            if (!checkouts[row.id]) {
                checkouts[row.id] = {
                    id: row.id,
                    userId: row.userId,
                    total: row.total,
                    paymentMethod: row.paymentMethod,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    company: row.company,
                    address: row.address,
                    apartment: row.apartment,
                    city: row.city,
                    postalCode: row.postalCode,
                    phone: row.phone,
                    bankZip: row.bankZip,
                    status: row.status,
                    items: []
                };
            }
            checkouts[row.id].items.push({
                sparePartId: row.sparePartId,
                quantity: row.quantity
            });
        });

        // Convert checkouts object to array
        const checkoutArray = Object.values(checkouts);
        result(null, checkoutArray);
    });
};


// Fetch checkouts with status 0
Checkout.getAllStatusZero = (result) => {
    sql.query("SELECT * FROM checkouts WHERE status = 0", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Count checkouts with status 0
Checkout.countStatusZero = (result) => {
    sql.query("SELECT COUNT(*) AS count FROM checkouts WHERE status = 0", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res[0]);
    });
};

// Update checkout status to 1
Checkout.updateStatusToOne = (id, result) => {
    sql.query(
        "UPDATE checkouts SET status = 1 WHERE id = ?",
        [id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, res);
        }
    );
};

// Fetch checkout by ID with its items and spare part names
Checkout.getById = (checkoutId, result) => {
    const query = `
        SELECT c.*, ci.sparePartId, ci.quantity, sp.name AS sparePartName
        FROM checkouts c 
        LEFT JOIN checkoutItems ci ON c.id = ci.checkoutId
        LEFT JOIN spareParts sp ON ci.sparePartId = sp.id
        WHERE c.id = ?
    `;
    sql.query(query, [checkoutId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            const checkout = {
                id: res[0].id,
                userId: res[0].userId,
                total: res[0].total,
                paymentMethod: res[0].paymentMethod,
                firstName: res[0].firstName,
                lastName: res[0].lastName,
                company: res[0].company,
                address: res[0].address,
                apartment: res[0].apartment,
                city: res[0].city,
                postalCode: res[0].postalCode,
                phone: res[0].phone,
                bankZip: res[0].bankZip,
                status: res[0].status,
                items: res.map(row => ({
                    sparePartId: row.sparePartId,
                    quantity: row.quantity,
                    sparePartName: row.sparePartName
                }))
            };
            result(null, checkout);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};



module.exports = Checkout;

