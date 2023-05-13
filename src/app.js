require('dotenv').config();

const express = require('express');
const { createServer } = require('http');
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
const culturePlanRoute = require('./routes/culturePlanRoutes');
const { getRecordCount } = require('./controllers/count');
const dbConnection = require('./config/dbConnection');
const cors = require('cors');
const morgan = require('morgan');

const WebSocket = require('ws')
const { handleSocket } = require('./controllers/notification');
const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
// Parse incoming request bodies as JSON
app.use(bodyParser.json());
app.use(morgan('dev'))
// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/', cultureMediumRoutes);
app.use('/api/', cultureRoutes);
app.use('/api/', growthRecordRoutes);
app.use('/api/', plantRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/', areaRoutes);
app.use('/api/', culturePlanRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/', cultureMediumRelationRoutes);
app.use('/api/', harvestStorageRoutes);
app.use('/api/', movedAreaRoutes);
app.use('/api/', trashRoutes);
app.use('/api/', userCulturePlanRoutes);
app.use('/api', culturePlanRoute);

app.get('/api/recordCounts', async (req, res) => {
    try {
      const areaCount = await getRecordCount('area');
      const culturePlanCount = await getRecordCount('culture_plan');
      const tasksCount = await getRecordCount('tasks');
  
      res.json({ areaCount, culturePlanCount, tasksCount });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

wss.on('connection', (ws) => {
    handleSocket(ws);
});
// wss.on("close", (ws) => {
//   console.log(ws)
//   console.log("disconnect")
// })
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
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});