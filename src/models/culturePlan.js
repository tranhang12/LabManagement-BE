const connection = require("../config/dbConnection");

class CulturePlan {
  constructor(culturePlan) {
    this.Area = culturePlan.Area;
    this.Plant_Type = culturePlan.Plant_Type;
    // this.Container_Quantity = culturePlan.Container_Quantity;
    this.Container_Type = culturePlan.Container_Type;
    this.Created_Date = culturePlan.Created_Date;
    this.Transition_Time = culturePlan.Transition_Time;
    this.BatchID = culturePlan.BatchID;
    this.Status = culturePlan.Status;
    this.Initial_Quantity = +culturePlan.Initial_Quantity;
    this.Current_Quantity = +culturePlan.Current_Quantity;
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

  static findByIdPromise = (Id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM culture_plan WHERE Culture_Plan_ID = ? LIMIT 1",
        [Id],
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res[0])
          }
        }
      );
    })
  }

  static updateCulturePlanCurrentQuantity = (Id, Current_Quantity) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE culture_plan SET Current_Quantity = ? WHERE Culture_Plan_ID = ?",
        [Current_Quantity, Id],
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        }
      );
    })
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
    const updateQuery = `UPDATE culture_plan SET Area = ?, Plant_Type = ?, Container_Type = ?, Created_Date = ?, Transition_Time = ?, Task_ID = ? ,Status = ?, Initial_Quantity = ?, Current_Quantity = ?, Remaining_Days = ? WHERE Culture_Plan_ID = ?`;
    const updateData = [
      culturePlan.Area,
      culturePlan.Plant_Type,
      // culturePlan.Container_Quantity,
      culturePlan.Container_Type,
      culturePlan.Created_Date,
      culturePlan.Transition_Time,
      culturePlan.BatchID,
      culturePlan.Task_ID,
      culturePlan.Status,
      culturePlan.Initial_Quantity,
      culturePlan.Current_Quantity,
      culturePlan.Remaining_Days,
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
    const deleteQuery = 'DELETE FROM culture_plan WHERE Culture_Plan_ID = ?'

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


