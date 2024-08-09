const sql = require('../config/db.config.js');

const SparePart = function(sparePart) {
    this.name = sparePart.name;
    this.price = sparePart.price;
    this.category = sparePart.category;
    this.availableQuantity = sparePart.availableQuantity;
    this.vehicleTypeId = sparePart.vehicleTypeId;
    this.brandId = sparePart.brandId;
};

SparePart.create = (newSparePart, images, result) => {
    sql.query('INSERT INTO spareParts SET ?', newSparePart, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        const sparePartId = res.insertId;
        const imageRecords = images.map(image => [sparePartId, image]);

        sql.query('INSERT INTO images (sparePartId, url) VALUES ?', [imageRecords], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            result(null, { id: sparePartId, ...newSparePart, images });
        });
    });
};

SparePart.getAll = result => {
    const query = `
        SELECT sp.*, v.id AS vehicleTypeId, v.name AS vehicleTypeName, v.url AS vehicleTypeUrl, 
               b.id AS brandId, b.name AS brandName, b.url AS brandUrl
        FROM spareParts sp
        LEFT JOIN vehicleTypes v ON sp.vehicleTypeId = v.id
        LEFT JOIN brands b ON sp.brandId = b.id
    `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        const spareParts = res.map(sparePart => ({
            ...sparePart,
            images: []
        }));

        sql.query('SELECT * FROM images', (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            res.forEach(image => {
                const sparePart = spareParts.find(sp => sp.id === image.sparePartId);
                if (sparePart) {
                    sparePart.images.push(image.url);
                }
            });

            result(null, spareParts);
        });
    });
};

SparePart.getByVehicleTypeAndBrand = (vehicleTypeId, brandId, result) => {
    const query = `
        SELECT sp.*, v.id AS vehicleTypeId, v.name AS vehicleTypeName, v.url AS vehicleTypeUrl, 
               b.id AS brandId, b.name AS brandName, b.url AS brandUrl
        FROM spareParts sp
        LEFT JOIN vehicleTypes v ON sp.vehicleTypeId = v.id
        LEFT JOIN brands b ON sp.brandId = b.id
        WHERE sp.vehicleTypeId = ? AND sp.brandId = ?
    `;
    sql.query(query, [vehicleTypeId, brandId], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        const spareParts = res.map(sparePart => ({
            ...sparePart,
            images: []
        }));

        sql.query('SELECT * FROM images WHERE sparePartId IN (?)', [spareParts.map(sp => sp.id)], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            res.forEach(image => {
                const sparePart = spareParts.find(sp => sp.id === image.sparePartId);
                if (sparePart) {
                    sparePart.images.push(image.url);
                }
            });

            result(null, spareParts);
        });
    });
};

SparePart.getById = (id, result) => {
    const query = `
        SELECT sp.*, v.id AS vehicleTypeId, v.name AS vehicleTypeName, v.url AS vehicleTypeUrl, 
               b.id AS brandId, b.name AS brandName, b.url AS brandUrl
        FROM spareParts sp
        LEFT JOIN vehicleTypes v ON sp.vehicleTypeId = v.id
        LEFT JOIN brands b ON sp.brandId = b.id
        WHERE sp.id = ?
    `;
    sql.query(query, [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.length) {
            const sparePart = {
                ...res[0],
                images: []
            };

            sql.query('SELECT * FROM images WHERE sparePartId = ?', [id], (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    result(null, err);
                    return;
                }

                sparePart.images = res.map(image => image.url);

                result(null, sparePart);
            });
        } else {
            result({ kind: 'not_found' }, null);
        }
    });
};

SparePart.remove = (id, result) => {
    sql.query('DELETE FROM spareParts WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Not found SparePart with the id
            result({ kind: 'not_found' }, null);
            return;
        }

        result(null, res);
    });
};

SparePart.updateById = (id, sparePart, result) => {
    sql.query(
        'UPDATE spareParts SET name = ?, price = ?, category = ?, availableQuantity = ?, vehicleTypeId = ?, brandId = ? WHERE id = ?',
        [sparePart.name, sparePart.price, sparePart.category, sparePart.availableQuantity, sparePart.vehicleTypeId, sparePart.brandId, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // Not found SparePart with the id
                result({ kind: 'not_found' }, null);
                return;
            }

            result(null, { id: id, ...sparePart });
        }
    );
};


module.exports = SparePart;
