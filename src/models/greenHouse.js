const connection = require('../config/dbConnection');


class GreenHouse {
    constructor(greenHouse) {
        this.Greenhouse_Name = greenHouse.Greenhouse_Name;
        this.Address = greenHouse.Address;
        this.Phone_Number = greenHouse.Phone_Number;

    }
    static findAll(result) {
        connection.query('SELECT * FROM greenhouse', (err, res) => {
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
        connection.query('SELECT * FROM greenhouse WHERE Greenhouse_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res);
            }
        });
    }
    static createGreenHouse(greenHouse, result) {

        connection.query('INSERT INTO greenhouse SET ?', greenHouse, (err, res) => {
            if (err) {

                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static updateGreenHouse(greenHouse, result) {
        const updateQuery = 'UPDATE greenhouse SET Greenhouse_Name = ?, Address = ?,Phone_Number = ? WHERE Greenhouse_ID = ?'
        const updateData = [greenHouse.Greenhouse_Name, greenHouse.Address, greenHouse.Phone_Number, greenHouse.Id]

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {


                result(null, res.affectedRows);
            }
        });
    }
    static deleteGreenHouse(Id, result) {
        const deleteQuery = 'DELETE FROM greenHouse WHERE Greenhouse_ID = ?'


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



module.exports = GreenHouse;