const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const db = require('./config/db.config.js');

// Require routes
require('./routes/vehicleTypes.routes.js')(app);
require('./routes/brand.routes.js')(app);
require('./routes/sparePart.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/checkout.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
