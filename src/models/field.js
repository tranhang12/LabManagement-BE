const connection = require('../config/dbConnection');

class Field {
    constructor(field) {
        this.Field_Name = field.Field_Name;
        this.Address = field.Address;
        this.Size = field.Size;

    }
    static findAll(result) {
        connection.query('SELECT * FROM field', (err, res) => {
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
        connection.query('SELECT * FROM field WHERE Field_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res);
            }
        });
    }
    static createField(field, result) {

        connection.query('INSERT INTO field SET ?', field, (err, res) => {
            if (err) {

                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static updateField(field, result) {
        const updateQuery = 'UPDATE field SET Field_Name = ?, Address = ?,Size = ? WHERE Field_ID = ?'
        const updateData = [field.Field_Name, field.Address, field.Size, field.Id]

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {

                result(null, res.affectedRows);
            }
        });
    }
    static deleteField(Id, result) {
        const deleteQuery = 'DELETE FROM field WHERE Field_ID = ?'


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



module.exports = Field;