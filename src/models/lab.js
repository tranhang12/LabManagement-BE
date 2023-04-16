const connection = require('../config/dbConnection');


class Lab {
    constructor(Lab) {
        this.Laboratory_Name = Lab.Laboratory_Name;
        this.Address = Lab.Address;
        this.Phone_Number = Lab.Phone_Number;

    }
    static findAll(result) {
        connection.query('SELECT * FROM laboratory', (err, res) => {
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
        connection.query('SELECT * FROM laboratory WHERE Laboratory_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res);
            }
        });
    }
    static createLab(Lab, result) {

        connection.query('INSERT INTO laboratory SET ?', Lab, (err, res) => {
            if (err) {

                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static updateLab(Lab, result) {
        const updateQuery = 'UPDATE laboratory SET Laboratory_Name = ?, Address = ?,Phone_Number = ? WHERE Laboratory_ID = ?'
        const updateData = [Lab.Laboratory_Name, Lab.Address, Lab.Phone_Number, Lab.Id]

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {


                result(null, res.affectedRows);
            }
        });
    }
    static deleteLab(Id, result) {
        const deleteQuery = 'DELETE FROM laboratory WHERE Laboratory_ID = ?'


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



module.exports = Lab;