const sql = require('../config/db.config.js');

const VehicleType = function(vehicleType) {
  this.name = vehicleType.name;
  this.url = vehicleType.url;
};

VehicleType.create = (newVehicleType, result) => {
  sql.query('INSERT INTO vehicleTypes SET ?', newVehicleType, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newVehicleType });
  });
};

VehicleType.getAll = result => {
  sql.query('SELECT * FROM vehicleTypes', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

VehicleType.updateById = (id, vehicleType, result) => {
  sql.query(
      'UPDATE vehicleTypes SET name = ?, url = ? WHERE id = ?',
      [vehicleType.name, vehicleType.url, id],
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
        result(null, { id: id, ...vehicleType });
      }
  );
};

VehicleType.remove = (id, result) => {
  sql.query('DELETE FROM vehicleTypes WHERE id = ?', id, (err, res) => {
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

module.exports = VehicleType;
