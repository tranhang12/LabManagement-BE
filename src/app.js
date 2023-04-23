require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cultureMediumRoutes = require('./routes/cultureMedium');
const cultureRoutes = require('./routes/culture');
const growthRecordRoutes = require('./routes/growthRecord');
const plantRoutes = require('./routes/plant');
const taskRoutes = require('./routes/tasks');
const areaRoutes = require('./routes/area');
const culturePlanRoutes = require('./routes/culturePlan');
const materialRoutes = require('./routes/material');
const cultureMediumRelationRoutes = require('./routes/cultureMediumRelation')
const dbConnection = require('./config/dbConnection');
const cors = require('cors');

const app = express();
app.use(cors());
// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Route handlers
app.use('/api', userRoutes, cultureMediumRoutes, cultureRoutes, growthRecordRoutes, plantRoutes, taskRoutes, areaRoutes, culturePlanRoutes, materialRoutes, cultureMediumRelationRoutes);

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