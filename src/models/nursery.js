const connection = require('../config/dbConnection');

class Nursery {
    constructor(nursery) {
        this.Nursery_Name = nursery.Nursery_Name;
        this.Address = nursery.Address;
        this.Phone_Number = nursery.Phone_Number;
    }

    static findAll(result) {
        connection.query('SELECT * FROM nursery', (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static findById(Id, result) {
        connection.query('SELECT * FROM nursery WHERE Nursery_ID = ?', [Id], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static createNursery(nursery, result) {

        connection.query('INSERT INTO nursery SET ?', nursery, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static updateNursery(nursery, result) {
        const updateQuery = 'UPDATE nursery SET Nursery_Name = ?, Address = ?, Phone_Number = ? WHERE Nursery_ID = ?';
        const updateData = [nursery.Nursery_Name, nursery.Address, nursery.Phone_Number, nursery.Nursery_ID];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static deleteNursery(Id, result) {
        const deleteQuery = 'DELETE FROM nursery WHERE Nursery_ID = ?'

        connection.query(deleteQuery, Id, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
}

module.exports = Nursery;