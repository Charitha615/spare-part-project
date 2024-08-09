const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'spare_part'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');

  // Create users table if not exists
  const usersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      email VARCHAR(191) UNIQUE,
      password VARCHAR(255)
    )
  `;
  connection.query(usersTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Users table created or already exists.');
  });

  // Create vehicleTypes table if not exists
  const vehicleTypesTableQuery = `
    CREATE TABLE IF NOT EXISTS vehicleTypes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      url VARCHAR(255)
    )
  `;
  connection.query(vehicleTypesTableQuery, (err, result) => {
    if (err) throw err;
    console.log('VehicleTypes table created or already exists.');
  });

  // Create brands table if not exists
  const brandsTableQuery = `
    CREATE TABLE IF NOT EXISTS brands (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      url VARCHAR(255),
      vehicleTypeId INT
    )
  `;
  connection.query(brandsTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Brands table created or already exists.');
  });

  // Create spareParts table if not exists
  const sparePartsTableQuery = `
    CREATE TABLE IF NOT EXISTS spareParts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      price DECIMAL(10, 2),
      category VARCHAR(255),
      availableQuantity INT,
      vehicleTypeId INT,
      brandId INT
    )
  `;
  connection.query(sparePartsTableQuery, (err, result) => {
    if (err) throw err;
    console.log('SpareParts table created or already exists.');
  });

  // Create images table if not exists
  const imagesTableQuery = `
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sparePartId INT,
      url VARCHAR(255),
      FOREIGN KEY (sparePartId) REFERENCES spareParts(id) ON DELETE CASCADE
    )
  `;
  connection.query(imagesTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Images table created or already exists.');
  });

  // Create checkouts table if not exists
  const checkoutsTableQuery = `
    CREATE TABLE IF NOT EXISTS checkouts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      total DECIMAL(10, 2),
      paymentMethod VARCHAR(255),
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      company VARCHAR(255),
      address VARCHAR(255),
      apartment VARCHAR(255),
      city VARCHAR(255),
      postalCode VARCHAR(255),
      phone VARCHAR(255),
      bankZip VARCHAR(255),
      status INT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `;
  connection.query(checkoutsTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Checkouts table created or already exists.');
  });

  // Create checkoutItems table if not exists
  const checkoutItemsTableQuery = `
    CREATE TABLE IF NOT EXISTS checkoutItems (  
      id INT AUTO_INCREMENT PRIMARY KEY,
      checkoutId INT,
      sparePartId INT,
      quantity INT,
      FOREIGN KEY (checkoutId) REFERENCES checkouts(id) ON DELETE CASCADE,
      FOREIGN KEY (sparePartId) REFERENCES spareParts(id) ON DELETE CASCADE
    )
  `;
  connection.query(checkoutItemsTableQuery, (err, result) => {
    if (err) throw err;
    console.log('CheckoutItems table created or already exists.');
  });
});

module.exports = connection;
