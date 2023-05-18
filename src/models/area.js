const connection = require('../config/dbConnection');

class Area {
    constructor(area) {
        this.Area_Name = area.Area_Name;
        this.Area_Size = area.Area_Size;
        this.Area_Unit = area.Area_Unit;
        this.Area_Type = area.Area_Type;
        this.Area_Locations = area.Area_Locations;
        this.Quantity = area.Quantity;
    }
    static findAll(result) {
        connection.query(`SELECT a.*, SUM(cp.Current_Quantity) AS Quantity
        FROM area a
        JOIN culture_plan cp ON a.Area_Name = cp.Area
        GROUP BY a.Area_Name;`, (err, res) => {
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
        connection.query('SELECT * FROM area WHERE Area_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res);
            }
        });
    }
    static findByName(Area_Name, result) {
        connection.query('SELECT * FROM area WHERE Area_Name = ?', [Area_Name], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res[0]);
            }
        });
    }
    static createArea(area, result) {

       // console.log(area)
        connection.query('INSERT INTO area SET ?', area, (err, res) => {
            if (err) {

                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static updateArea(area, result) {
        const updateQuery = 'UPDATE area SET Area_Name = ?, Area_Size = ?,Area_Unit = ? ,Area_Type = ?, Area_Locations = ? WHERE Area_ID = ?'
        const updateData = [area.Area_Name, area.Area_Size, area.Area_Unit, area.Area_Type,area.Area_Locations, area.Id]
        
        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {

                result(null, res.affectedRows);
            }
        });
    }
    static deleteArea(Id, result) {
        const deleteQuery = 'DELETE FROM area WHERE Area_ID = ?'


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



module.exports = Area;