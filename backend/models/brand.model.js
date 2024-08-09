const sql = require('../config/db.config.js');

const Brand = function(brand) {
    this.name = brand.name;
    this.url = brand.url;
    this.vehicleTypeId = brand.vehicleTypeId;
};

Brand.create = (newBrand, result) => {
    sql.query('INSERT INTO brands SET ?', newBrand, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newBrand });
    });
};

Brand.getAll = result => {
    const query = `
        SELECT b.*, v.name AS vehicleTypeName, v.url AS vehicleTypeUrl
        FROM brands b
        LEFT JOIN vehicleTypes v ON b.vehicleTypeId = v.id
    `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Brand.updateById = (id, brand, result) => {
    sql.query(
        'UPDATE brands SET name = ?, url = ?, vehicleTypeId = ? WHERE id = ?',
        [brand.name, brand.url, brand.vehicleTypeId, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
                return;
            }
            result(null, { id: id, ...brand });
        }
    );
};

Brand.remove = (id, result) => {
    sql.query('DELETE FROM brands WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        result(null, res);
    });
};

Brand.getByVehicleTypeId = (vehicleTypeId, result) => {
    const query = `
        SELECT b.*, v.name AS vehicleTypeName, v.url AS vehicleTypeUrl
        FROM brands b
        LEFT JOIN vehicleTypes v ON b.vehicleTypeId = v.id
        WHERE b.vehicleTypeId = ?
    `;
    sql.query(query, [vehicleTypeId], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


module.exports = Brand;
