const connection = require("../config/dbConnection");

class Trash {
  constructor(trash) {
    this.Crop_UID = trash.Crop_UID;
    this.Quantity = trash.Quantity;
    this.Source_Area_UID = trash.Source_Area_UID;
    this.Source_Area_Name = trash.Source_Area_Name;
  }

  static findAll(result) {
    connection.query("SELECT * FROM crop_read_trash", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  // static findById(Id, result) {
  //     connection.query('SELECT * FROM crop_read_harvested_storage WHERE trash_ID = ?', [Id], (err, res) => {
  //         if (err) {
  //             console.log('error: ', err);
  //             result(err, null);
  //         } else {
  //             result(null, res);
  //         }
  //     });
  // }

  static createtrash(trash, result) {
    connection.query("INSERT INTO crop_read_trash SET ?", trash, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }

  static updatetrash(trash, result) {
    const currentDate = new Date()
      .toISOString()
      .replace("T", " ")
      .substr(0, 19);
    const updateQuery =
      "UPDATE crop_read_trash SET Crop_UID = ?, Quantity = ?,  Source_Area_UID = ?, Source_Area_Name = ?, Last_Updated = ? WHERE ID = ?";
    const updateData = [
      trash.Crop_UID,
      trash.Quantity,
      trash.Source_Area_UID,
      trash.Source_Area_Name,
      currentDate,
      trash.Id,
    ];

    connection.query(updateQuery, updateData, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }

  // static deletetrash(Id, result) {
  //     const deleteQuery = 'DELETE FROM crop_read_harvested_storage WHERE trash_ID = ?'

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

module.exports = Trash;