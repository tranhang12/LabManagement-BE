const connection = require('../config/dbConnection');

class HarvestStorage {
    constructor(harvestStorage) {
        this.Crop_UID = harvestStorage.Crop_UID;
        this.Quantity = harvestStorage.Quantity;
        this.Produced_Quantity = harvestStorage.Produced_Quantity;
        this.Source_Area_UID = harvestStorage.Source_Area_UID;
        this.Source_Area_Name = harvestStorage.Source_Area_Name
    }

    static findAll(result) {
        connection.query('SELECT * FROM culture_plan_harvested_storage', (err, res) => {
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
    
    static updateharvestStorage(harvestStorage, result) {
        const updateQuery = 'UPDATE culture_plan_harvested_storage SET Crop_UID = ?, Produced_Quantity = ?, Source_Area_UID = ?, Source_Area_Name = ?, Quantity = ?  WHERE ID = ?';
        const updateData = [harvestStorage.Crop_UID, harvestStorage.Produced_Quantity, harvestStorage.Source_Area_UID, harvestStorage.Source_Area_Name, harvestStorage.Quantity,  harvestStorage.Id];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
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