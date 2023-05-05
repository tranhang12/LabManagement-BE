const connection = require("../config/dbConnection");

class CulturePlan {
  constructor(culturePlan) {
    this.Activity_Type = culturePlan.Activity_Type;
    this.Area = culturePlan.Area;
    this.Plant_Type = culturePlan.Plant_Type;
    this.Crop_Type = culturePlan.Crop_Type;
    this.Container_Quantity = culturePlan.Container_Quantity;
    this.Container_Type = culturePlan.Container_Type;
    this.Transition_Time = culturePlan.Transition_Time;
    this.Source_Area = culturePlan.Source_Area;
    //this.Destination_Area = culturePlan.Destination_Area;
    this.Number_of_Plants = culturePlan.Number_of_Plants;
    this.Task_ID = culturePlan.Task_ID;
    //this.Created_Date = culturePlan.Created_Date;
    this.Status = culturePlan.Status;
    this.INITIAL_AREA_CURRENT_QUANTITY =
      culturePlan.INITIAL_AREA_CURRENT_QUANTITY;
    this.INITIAL_AREA_INITIAL_QUANTITY =
      culturePlan.INITIAL_AREA_INITIAL_QUANTITY;
    this.INITIAL_AREA_CURRENT_QUANTITY =
      culturePlan.INITIAL_AREA_CURRENT_QUANTITY;
    this.INITIAL_AREA_INITIAL_QUANTITY =
      culturePlan.INITIAL_AREA_INITIAL_QUANTITY;
    this.INITIAL_AREA_NAME = culturePlan.INITIAL_AREA_NAME;
    this.Remaining_Days = culturePlan.Remaining_Days;
  }

  static findAll(result) {
    connection.query("SELECT * FROM culture_plan", (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static findById(Id, result) {
    connection.query(
      "SELECT * FROM culture_plan WHERE Culture_Plan_ID = ?",
      [Id],
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }

  static createCulturePlan(culturePlan, result) {
    connection.query(
      "INSERT INTO culture_plan SET ?",
      culturePlan,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }

  static updateCulturePlan(culturePlan, result) {
    const updateQuery = `UPDATE culture_plan SET Activity_Type = ?, Area = ?, Plant_Type = ?, Crop_Type = ?,Container_Quantity = ?, Container_Type = ?, Transition_Time = ?, Task_ID = ? ,Status = ?, INITIAL_AREA_CURRENT_QUANTITY = ?, INITIAL_AREA_INITIAL_QUANTITY = ?, Remaining_Days = ? ,INITIAL_AREA_NAME = ? WHERE Culture_Plan_ID = ?`;
    const updateData = [
      culturePlan.Activity_Type,
      culturePlan.Area,
      culturePlan.Plant_Type,
      culturePlan.Crop_Type,
      culturePlan.Container_Quantity,
      culturePlan.Container_Type,
      culturePlan.Transition_Time,
      culturePlan.Task_ID,
      culturePlan.Status,
      culturePlan.INITIAL_AREA_CURRENT_QUANTITY,
      culturePlan.INITIAL_AREA_INITIAL_QUANTITY, 
      culturePlan.Remaining_Days,
      culturePlan.INITIAL_AREA_NAME,
      culturePlan.Culture_Plan_ID,
    ];
    console.log(updateData)
    console.log(updateQuery)
    connection.query(updateQuery, updateData, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }

  static deleteCulturePlan(Id, result) {
    const deleteQuery = "DELETE FROM culture_plan WHERE Culture_Plan_ID = ?";

    connection.query(deleteQuery, Id, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }

  static createOrUpdateMovement(culturePlan, result) {
    const updateQuery =
      "UPDATE culture_plan SET Source_Area = ?, Destination_Area = ?, Number_of_Plants = ? WHERE Culture_Plan_ID = ?";
    const updateData = [
      culturePlan.Source_Area,
      culturePlan.Destination_Area,
      culturePlan.Number_of_Plants,
      culturePlan.Culture_Plan_ID,
    ];

    connection.query(updateQuery, updateData, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }

  static deleteMovement(Id, result) {
    const deleteQuery =
      "UPDATE culture_plan SET Source_Area = null, Destination_Area = null, Number_of_Plants = null WHERE Culture_Plan_ID = ?";

    connection.query(deleteQuery, Id, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }
}

module.exports = CulturePlan;


