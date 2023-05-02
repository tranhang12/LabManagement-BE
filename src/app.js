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
const harvestStorageRoutes = require('./routes/harvestStorage')
const movedAreaRoutes = require('./routes/movedArea')
const trashRoutes = require('./routes/trash')
const userCulturePlanRoutes = require('./routes/userCulturePlan')
const dbConnection = require('./config/dbConnection');
const cors = require('cors');

const app = express();
app.use(cors());
// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/cultureMedium', cultureMediumRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/growthRecord', growthRecordRoutes);
app.use('/api/plant', plantRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/area', areaRoutes);
app.use('/api/culturePlan', culturePlanRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/cultureMediumRelation', cultureMediumRelationRoutes);
app.use('/api/harvestStorage', harvestStorageRoutes);
app.use('/api/movedArea', movedAreaRoutes);
app.use('/api/trash', trashRoutes);
app.use('/api/userCulturePlan', userCulturePlanRoutes);

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