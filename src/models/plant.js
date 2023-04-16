const connection = require('../config/dbConnection');

class Plant {
    constructor(plant) {
        this.Plant_Name = plant.Plant_Name;
        this.Scientific_Name = plant.Scientific_Name;
        this.Plant_Description = plant.Plant_Description;
        this.Image = plant.Image;
    }

    static findAll(result) {
        connection.query('SELECT * FROM plant', (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static findById(Id, result) {
        connection.query('SELECT * FROM plant WHERE Plant_ID = ?', [Id], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static createPlant(plant, result) {

        connection.query('INSERT INTO plant SET ?', plant, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static updatePlant(plant, result) {
        const updateQuery = 'UPDATE plant SET Plant_Name = ?, Scientific_Name = ?, Plant_Description = ?, Image = ? WHERE Plant_ID = ?';
        const updateData = [plant.Plant_Name, plant.Scientific_Name, plant.Plant_Description, plant.Image, plant.Plant_ID];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static deletePlant(Id, result) {
        const deleteQuery = 'DELETE FROM plant WHERE Plant_ID = ?'

        connection.query(deleteQuery, Id, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
}

module.exports = Plant;