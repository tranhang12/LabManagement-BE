const connection = require('../config/dbConnection');

class MovedArea {
    constructor(movedArea) {
        this.Crop_UID = movedArea.Crop_UID;
        this.Area_UID = movedArea.Area_UID;
        this.Name = movedArea.Name;
        this.Initial_Quantity = movedArea.Initial_Quantity;
        this.Current_Quantity = movedArea.Current_Quantity;
        this.Transition_Time = movedArea.Transition_Time;
        this.Remaining_Days = movedArea.Remaining_Days;
    }

    static findAll(result) {
        connection.query('SELECT * FROM culture_plan_moved_area', (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static findAllByCulturePlanIdPromise(Id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM culture_plan_moved_area WHERE Culture_Plan_ID = ?', [Id], (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    static updateMovedAreaCurrentQuantityAndTransitionTime(MovedAreaId, {Current_Quantity, Transition_Time}) {
        return new Promise((resolve, reject) => {
            const updated = {
                Current_Quantity
              }
              if (Transition_Time) {
                updated.Transition_Time = Transition_Time
              }
            connection.query('UPDATE culture_plan_moved_area SET ? WHERE ID = ?', [updated, MovedAreaId], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    // static findById(Id, result) {
    //     connection.query('SELECT * FROM culture_plan_harvested_storage WHERE movedArea_ID = ?', [Id], (err, res) => {
    //         if (err) {
    //             console.log('error: ', err);
    //             result(err, null);
    //         } else {
    //             result(null, res);
    //         }
    //     });
    // }

    static createmovedArea(movedArea, result) {

        connection.query('INSERT INTO culture_plan_moved_area SET ?', movedArea, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static createMovedAreaPromise(movedArea) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO culture_plan_moved_area SET ?', movedArea, (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(res)
                }
            });
        })
        
    }
    
    static updatemovedArea(movedArea, result) {
        const updateQuery = 'UPDATE culture_plan_moved_area SET Crop_UID = ?, Current_Quantity = ?, Area_UID = ?, Name = ?, Initial_Quantity = ?, Transition_Time = ?, Remaining_Days = ?  WHERE ID = ?';
        const updateData = [movedArea.Crop_UID, movedArea.Current_Quantity, movedArea.Area_UID, movedArea.Name, movedArea.Initial_Quantity,  movedArea.Transition_Time, movedArea.Remaining_Days, movedArea.Id];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    // static deletemovedArea(Id, result) {
    //     const deleteQuery = 'DELETE FROM culture_plan_harvested_storage WHERE movedArea_ID = ?'

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

module.exports = MovedArea;