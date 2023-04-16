const connection = require('../config/dbConnection');

class CultureMedium {
    constructor(cultureMedium) {
        this.Culture_Medium_Name = cultureMedium.Culture_Medium_Name;
        this.Culture_Medium_Description = cultureMedium.Culture_Medium_Description;

    }
    static findAll(result) {
        connection.query('SELECT * FROM culture_medium', (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res);
            }
        });
    }
    static findById(Id, result) {
        connection.query('SELECT * FROM culture_medium WHERE Culture_Medium_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res);
            }
        });
    }
    static createCultureMedium(cultureMedium, result) {

        connection.query('INSERT INTO culture_medium SET ?', cultureMedium, (err, res) => {
            if (err) {

                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static updateCultureMedium(cultureMedium, result) {
        const updateQuery = 'UPDATE culture_medium SET Culture_Medium_Name = ?, Culture_Medium_Description = ? WHERE Culture_Medium_ID = ?'
        const updateData = [cultureMedium.Culture_Medium_Name, cultureMedium.Culture_Medium_Description, cultureMedium.Id]

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                //console.log('error: ', err);
                result(err, null);
            } else {

                result(null, res.affectedRows);
            }
        });
    }
    static deleteCultureMedium(Id, result) {
        const deleteQuery = 'DELETE FROM culture_medium WHERE Culture_Medium_ID = ?'


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



module.exports = CultureMedium;