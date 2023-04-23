const connection = require('../config/dbConnection');

class Culture {
    constructor(culture) {
        this.Plant_ID = culture.Plant_ID;
        this.Culture_Medium_ID = culture.Culture_Medium_ID;
        this.Start_Date = culture.Start_Date;
        this.Duration_Of_Culture = culture.Duration_Of_Culture;
        this.Duration_Of_Bud_Regeneration = culture.Duration_Of_Bud_Regeneration;
        this.Duration_Of_Multiply_Bud = culture.Duration_Of_Multiply_Bud;
        this.Duration_Of_Rooting = culture.Duration_Of_Rooting;
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
        const updateQuery = 'UPDATE culture SET Plant_ID = ?, Culture_Medium_ID = ?, Start_Date = ?, Duration_Of_Culture = ?, Duration_Of_Bud_Regeneration = ?, Duration_Of_Multiply_Bud = ?, Duration_Of_Rooting = ?, Growth_Parameters_ID = ? WHERE Culture_ID = ?';
        const updateData = [culture.Plant_ID, culture.Culture_Medium_ID, culture.Start_Date, culture.Duration_Of_Culture, culture.Duration_Of_Bud_Regeneration, culture.Duration_Of_Multiply_Bud, culture.Duration_Of_Rooting, culture.Growth_Parameters_ID, culture.Culture_ID];

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