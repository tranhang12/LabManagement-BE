const connection = require('../config/dbConnection');

class Culture {
    constructor(culture) {
        this.Plant_ID = culture.Plant_ID;
        this.Culture_Medium_ID = culture.Culture_Medium_ID;
        this.Laboratory_ID = culture.Laboratory_ID;
        this.Nursery_ID = culture.Nursery_ID;
        this.Greenhouse_ID = culture.Greenhouse_ID;
        this.Field_ID = culture.Field_ID;
        this.Start_Date = culture.Start_Date;
        this.Duration_Of_Nursery_1 = culture.Duration_Of_Nursery_1;
        this.Duration_Of_Laboratory = culture.Duration_Of_Laboratory;
        this.Duration_Of_Nursery_2 = culture.Duration_Of_Nursery_2
        this.Duration_Of_GreenHouse = culture.Duration_Of_GreenHouse;
        this.Duration_Of_Field = culture.Duration_Of_Field;
        this.Growth_Parameters_ID = culture.Growth_Parameters_ID;

    }

    static findAll(result) {
        connection.query('SELECT * FROM culture', (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static findById(Id, result) {
        connection.query('SELECT * FROM culture WHERE Culture_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static createCulture(culture, result) {

        connection.query('INSERT INTO culture SET ?', culture, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    
    static updateCulture(culture, result) {
        const updateQuery = 'UPDATE culture SET Plant_ID = ?, Culture_Medium_ID = ?, Laboratory_ID = ?, Nursery_ID = ?, Greenhouse_ID = ?, Field_ID = ?, Start_Date = ?, Duration_Of_Nursery_1 = ?, Duration_Of_Laboratory = ?, Duration_Of_Nursery_2 = ?, Duration_Of_Greenhouse = ?, Duration_Of_Field = ?, Growth_Parameters_ID = ? WHERE Culture_ID = ?';
        const updateData = [culture.Plant_ID, culture.Culture_Medium_ID, culture.Laboratory_ID, culture.Nursery_ID, culture.Greenhouse_ID, culture.Field_ID, culture.Start_Date, culture.Duration_Of_Nursery_1, culture.Duration_Of_Laboratory, culture.Duration_Of_Nursery_2, culture.Duration_Of_GreenHouse, culture.Duration_Of_Field, culture.Growth_Parameters_ID, culture.Culture_ID];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static deleteCulture(Id, result) {
        const deleteQuery = 'DELETE FROM culture WHERE Culture_ID = ?'

        connection.query(deleteQuery, Id, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

}



module.exports = Culture;