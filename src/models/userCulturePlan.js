const connection = require("../config/dbConnection");

class UserCulturePlan {
  constructor(userCulturePlan) {
    this.User_ID = userCulturePlan.User_ID;
    this.Culture_Plan_ID = userCulturePlan.Culture_Plan_ID;
  }

  static findAll(result) {
    connection.query("SELECT * FROM user_culture_plan", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  // static findById(Id, result) {
  //     connection.query('SELECT * FROM culture_plan_harvested_storage WHERE userCulturePlan_ID = ?', [Id], (err, res) => {
  //         if (err) {
  //             console.log('error: ', err);
  //             result(err, null);
  //         } else {
  //             result(null, res);
  //         }
  //     });
  // }

  static createuserCulturePlan(userCulturePlan, result) {
    connection.query("INSERT INTO user_culture_plan SET ?", userCulturePlan, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }

  // static updateuserCulturePlan(userCulturePlan, result) {
  //   const currentDate = new Date()
  //     .toISOString()
  //     .replace("T", " ")
  //     .substr(0, 19);
  //   const updateQuery =
  //     "UPDATE crop_read_userCulturePlan SET Crop_UID = ?, Quantity = ?,  Source_Area_UID = ?, Source_Area_Name = ?, Last_Updated = ? WHERE ID = ?";
  //   const updateData = [
  //     userCulturePlan.Crop_UID,
  //     userCulturePlan.Quantity,
  //     userCulturePlan.Source_Area_UID,
  //     userCulturePlan.Source_Area_Name,
  //     currentDate,
  //     userCulturePlan.Id,
  //   ];

  //   connection.query(updateQuery, updateData, (err, res) => {
  //     if (err) {
  //       result(err, null);
  //     } else {
  //       result(null, res.affectedRows);
  //     }
  //   });
  // }

  // static deleteuserCulturePlan(Id, result) {
  //     const deleteQuery = 'DELETE FROM culture_plan_harvested_storage WHERE userCulturePlan_ID = ?'

  //     connection.query(deleteQuery, Id, (err, res) => {
  //         if (err) {
  //             console.log('error: ', err);
  //             result(err, null);
  //         } else {
  //             result(null, res.affectedRows);
  //         }
  //     });
  // }
}

module.exports = UserCulturePlan;