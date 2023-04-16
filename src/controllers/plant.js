
const Plant = require('../models/plant');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');

exports.getAllPlants = (req, res) => {
    try {
        Plant.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving plants data from database'
                });
                return;
            }
            if (result != undefined) {

                res.status(200).send({
                    status: true,
                    message: 'Success',
                    result: result
                });
            } else {
                res.status(500).send({
                    status: false,
                    message: 'Something went wrong'
                });
                return;
            }
        });

    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in getting data from Database'
        });
    }
};

exports.getPlant = (req, res) => {
    try {
        let { Id } = req.params;

        Plant.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving plant data from database'
                });
                return;
            }
            if (result != undefined) {
                let response = {
                    status: true,
                    message: 'Success',
                    result: result
                }

                res.status(200).send(response);

            } else {
                res.status(500).send({
                    status: false,
                    message: 'Something went wrong'
                });
                return;
            }
        });

    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in getting data from Database'
        });
    }
};

exports.addPlant = (req, res) => {
    try {
        const plant = new Plant(req.body);

        Plant.createPlant(plant, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating plant in database'
                });
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating plant in database'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Record added successfully'
            });
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in creating plant in database'
        });
    }
}

exports.updatePlant = (req, res) => {
    try {
        let plant = new Plant(req.body);

        plant.Plant_ID = req.params.Id;

        Plant.updatePlant(plant, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating plant in database'
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating plant in database'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Record updated successfully'
            });
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in updating plant in database. Record may not exist'
        });
    }
}

exports.deletePlant = (req, res) => {
    try {
        const Id = req.params.Id;

        Plant.deletePlant(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting plant in database'
                });
                return;
            }
            
            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'Plant does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Plant deleted successfully.'
            });
        });  
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'An error occured while deleting your record'
        });
    }
        
};




