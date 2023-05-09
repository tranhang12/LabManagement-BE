const { dbConnection } = require('../models/culturePlanMove');
const { dbConnection: movedAreaDbConnection } = require('../models/cropReadMovedArea');

const moveCrop = async (req, res) => {
  const { Culture_Plan_ID, Area_Name, Initial_Quantity, Current_Quantity, Transition_Time, Remaining_Days } = req.body;
  if (
    !Culture_Plan_ID || !Area_Name|| !Initial_Quantity || !Current_Quantity || !Transition_Time
  ) {
    return res.status(400).send('Missing or invalid input');
  }
  const query = `
    INSERT INTO culture_plan_moved_area (Culture_Plan_ID, Area_Name, Initial_Quantity, Current_Quantity, Created_Date, Transition_Time, Remaining_Days)
    VALUES (?, ?, ?, ?, NOW(), ?, ?);
  `;
  movedAreaDbConnection.query(query, [Culture_Plan_ID, Area_Name, Initial_Quantity, Current_Quantity, Transition_Time, Remaining_Days], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(201).json({ message: 'Crop moved successfully' });
  });
};

module.exports = {
  moveCrop
};
