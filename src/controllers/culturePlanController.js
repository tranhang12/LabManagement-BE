const { dbConnection } = require('../models/culturePlanMove');
const { dbConnection: movedAreaDbConnection } = require('../models/cropReadMovedArea');

const moveCrop = async (req, res) => {
  const { Culture_Plan_ID, Area_Name, Initial_Quantity, Current_Quantity, Transition_Time, Remaining_Days } = req.body;

  try {
    const query = `
      INSERT INTO crop_read_moved_area (Crop_UID, Area_Name, Initial_Quantity, Current_Quantity, Created_Date, Transition_Time, Remaining_Days)
      VALUES (?, ?, ?, ?, NOW(), ?, ?);
    `;
    await movedAreaDbConnection.query(query, [Culture_Plan_ID, Area_Name, Initial_Quantity, Current_Quantity, Transition_Time, Remaining_Days]);

    res.status(201).json({ message: 'Crop moved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  moveCrop
};
