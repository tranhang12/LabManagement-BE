const connection = require('../config/dbConnection');

class HarvestStorage {
    constructor(harvestStorage) {
        this.Culture_plan_ID = harvestStorage.Culture_plan_ID;
        this.Quantity = harvestStorage.Quantity;
        this.Source_Area_Name = harvestStorage.Source_Area_Name
    }

    static findAll(result) {
        connection.query(`SELECT cphs.*, cp.BatchID, cp.Plant_Type, cp.Container_Type 
        FROM culture_plan_harvested_storage cphs 
        JOIN culture_plan cp ON cphs.Culture_Plan_ID = cp.Culture_Plan_ID`, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static findById(Id, result) {
        connection.query('SELECT * FROM culture_plan_harvested_storage WHERE harvestStorage_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static createharvestStorage(harvestStorage, result) {

        connection.query('INSERT INTO culture_plan_harvested_storage SET ?', harvestStorage, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    
    // static updateharvestStorage(harvestStorage, result) {
    //     const updateQuery = 'UPDATE culture_plan_harvested_storage SET Crop_UID = ?, Produced_Quantity = ?, Source_Area_UID = ?, Source_Area_Name = ?, Quantity = ?  WHERE ID = ?';
    //     const updateData = [harvestStorage.Crop_UID, harvestStorage.Produced_Quantity, harvestStorage.Source_Area_UID, harvestStorage.Source_Area_Name, harvestStorage.Quantity,  harvestStorage.Id];

    //     connection.query(updateQuery, updateData, (err, res) => {
    //         if (err) {
    //             result(err, null);
    //         } else {
    //             result(null, res.affectedRows);
    //         }
    //     });
    // }

    static createHarvestStoragePromise(harvestStorage) {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO culture_plan_harvested_storage SET ?", [harvestStorage], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    // static deleteharvestStorage(Id, result) {
    //     const deleteQuery = 'DELETE FROM culture_plan_harvested_storage WHERE harvestStorage_ID = ?'

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

module.exports = HarvestStorage;