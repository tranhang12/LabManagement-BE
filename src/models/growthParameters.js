const connection = require('../config/dbConnection');


class GrowthParameters {
    constructor(growthParameters) {
        this.Temperature = growthParameters.Temperature;
        this.Photoperiod = growthParameters.Photoperiod;
        this.Light_Intensity = growthParameters.Light_Intensity;
        this.Humidity = growthParameters.Humidity;
        this.pH = growthParameters.pH;
        this.Container = growthParameters.Container;
        this.Container_Size = growthParameters.Container_Size;

    }
    static findAll(result) {
        connection.query('SELECT * FROM growth_parameters', (err, res) => {
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
        connection.query('SELECT * FROM growth_parameters WHERE Growth_Parameters_ID = ?', [Id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                //console.log(res)
                result(null, res);
            }
        });
    }
    static createGrowthParameters(growthParameters, result) {

        connection.query('INSERT INTO growth_parameters SET ?', growthParameters, (err, res) => {
            if (err) {

                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static updateGrowthParameters(growthParameters, result) {
        const updateQuery = 'UPDATE growth_parameters SET Temperature = ?, Photoperiod = ?,Light_Intensity = ? ,Humidity = ?,pH = ?,Container = ?,Container_Size = ? WHERE Growth_Parameters_ID = ?'
        const updateData = [growthParameters.Temperature, growthParameters.Photoperiod,
        growthParameters.Light_Intensity, growthParameters.Humidity, growthParameters.pH,
        growthParameters.Container, growthParameters.Container_Size, growthParameters.Id]

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {


                result(null, res.affectedRows);
            }
        });
    }
    static deleteGrowthParameters(Id, result) {
        const deleteQuery = 'DELETE FROM growth_parameters WHERE Growth_Parameters_ID = ?'


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



module.exports = GrowthParameters;