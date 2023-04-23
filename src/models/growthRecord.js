const connection = require('../config/dbConnection');

class GrowthRecord {
    constructor(growthRecord) {
        this.Culture_Plan_ID = growthRecord.Culture_Plan_ID;
        this.Observation_Date = growthRecord.Observation_Date;
        this.Height = growthRecord.Height;
        this.Width = growthRecord.Width;
        this.Number_of_Leaves = growthRecord.Number_of_Leaves;
        this.Health_Status = growthRecord.Health_Status;
        this.Image = growthRecord.Image;
    }

    static findAll(result) {
        connection.query('SELECT * FROM growth_record', (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static findById(Id, result) {
        connection.query('SELECT * FROM growth_record WHERE Growth_Record_ID = ?', [Id], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static createGrowthRecord(growthRecord, result) {

        connection.query('INSERT INTO growth_record SET ?', growthRecord, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static updateGrowthRecord(growthRecord, result) {
        const updateQuery = 'UPDATE growth_record SET Culture_Plan_ID = ?, Observation_Date = ?, Height = ?, Width = ?, Number_of_Leaves = ?, Health_Status = ?, Image = ? WHERE Growth_Record_ID = ?';
        const updateData = [growthRecord.Culture_Plan_ID, growthRecord.Observation_Date, growthRecord.Height, growthRecord.Width, growthRecord.Number_of_Leaves, growthRecord.Health_Status, growthRecord.Image, growthRecord.Growth_Record_ID];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static deleteGrowthRecord(Id, result) {
        const deleteQuery = 'DELETE FROM growth_record WHERE Growth_Record_ID = ?'

        connection.query(deleteQuery, Id, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

}

module.exports = GrowthRecord;