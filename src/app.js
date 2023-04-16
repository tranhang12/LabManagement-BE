const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cultureMediumRoutes = require('./routes/cultureMedium');
const fieldRoutes = require('./routes/field');
const cultureRoutes = require('./routes/culture');
const greenHouseRoutes = require('./routes/greenHouse');
const labRoutes = require('./routes/lab')
const growthParametersRoutes = require('./routes/growthParameters');
const growthRecordRoutes = require('./routes/growthRecord');
const nurseryRoutes = require('./routes/nursery');
const plantRoutes = require('./routes/plant');
const taskRoutes = require('./routes/tasks');
const dbConnection = require('./config/dbConnection');

const app = express();

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Route handlers
app.use('/api', userRoutes, cultureMediumRoutes, fieldRoutes, cultureRoutes, greenHouseRoutes, growthParametersRoutes, labRoutes, growthRecordRoutes, nurseryRoutes, plantRoutes, taskRoutes);

// Connect to database
dbConnection.connect((err) => {
    if (err) {
        console.log(err)

    }
    else {
        console.log('Connected to MySQL database');
    }

});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});