const connection = require('../config/dbConnection');

class Material {
    constructor(material) {
        this.Category = material.Category;
        this.Name = material.Name;
        this.Price = material.Price;
        this.Produced_By = material.Produced_By;
        this.Quantity = material.Quantity;
        this.Additional_Notes = material.Additional_Notes;
        this.Unit = material.Unit;
        this.Expiration_Date = material.Expiration_Date;
    }
    static findAll(result) {
        connection.query('SELECT * FROM material', (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    static findById(Id, result) {
        connection.query('SELECT * FROM material WHERE Material_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    static createMaterial(material, result) {
        connection.query('INSERT INTO material SET ?', material, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static updateMaterial(material, result) {
        const updateQuery = 'UPDATE material SET Category = ?, Name = ?, Price = ?, Produced_By = ?, Quantity = ?, Additional_Notes = ?, Unit = ?, Expiration_Date = ? WHERE Material_ID = ?'
        const updateData = [material.Category, material.Name, material.Price, material.Produced_By, material.Quantity, material.Additional_Notes, material.Unit, material.Expiration_Date, material.Id]

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static deleteMaterial(Id, result) {
        const deleteQuery = 'DELETE FROM material WHERE Material_ID = ?'

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

module.exports = Material;