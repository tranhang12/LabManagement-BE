const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const HarvestStorage = require('../models/harvestStorage');
const MovedArea = require("../models/movedArea")
const CulturePlan = require("../models/culturePlan")


exports.getAllHarvestStorages = (req, res) => {
    try {
        HarvestStorage.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving harvestStorage data from database:' + err.message
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
            message: 'Error in getting data from Database:' + error.message
        });
    }
};

exports.getharvestStorage = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        HarvestStorage.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving harvestStorage data from database:' + err.message
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
            message: 'Error in getting data from Database:' + error.message
        });
    }
};

exports.addharvestStorage = async (req, res) => {
    try {
        const {
            Culture_Plan_ID,
            Area_Name,
            Harvest_Type,
            Quantity
        } = req.body
        const culturePlanId = +Culture_Plan_ID
        const culturePlan = await CulturePlan.findByIdPromise(culturePlanId)
        const movedAreas = await MovedArea.findAllByCulturePlanIdPromise(culturePlanId)
        let harvestQuantity = 0


        if (culturePlan.Area === Area_Name) {
            harvestQuantity = Harvest_Type === "all" ? culturePlan.Current_Quantity : +Quantity
            if (culturePlan.Current_Quantity < harvestQuantity || harvestQuantity <= 0) {
                return res.status(400).send({
                    status: false,
                    message: 'Invalid harvest quantity'
                });
            }

            await Promise.all([HarvestStorage.createHarvestStoragePromise({
                Culture_Plan_ID: culturePlanId,
                Quantity: harvestQuantity,
                Source_Area_Name: Area_Name
            }),
            CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, {
                Current_Quantity: culturePlan.Current_Quantity - harvestQuantity
            })
            ])
        } else {
            const foundMovedAreaIndex = movedAreas.findIndex(e => e.Area_Name === Area_Name)
            if (foundMovedAreaIndex === -1) {
                return res.status(400).send({
                    status: false,
                    message: 'Move Area not found'
                });
            }

            const movedArea = movedAreas[foundMovedAreaIndex]
            harvestQuantity = Harvest_Type === "all" ? movedArea.Current_Quantity : +Quantity
            if (movedArea.Current_Quantity < harvestQuantity || harvestQuantity <= 0) {
                return res.status(400).send({
                    status: false,
                    message: 'Invalid harvest quantity'
                });
            }

            await Promise.all([HarvestStorage.createHarvestStoragePromise({
                Culture_Plan_ID: culturePlanId,
                Quantity: harvestQuantity,
                Source_Area_Name: Area_Name
            }),
            MovedArea.updateMovedAreaQuantityAndTransitionTime(movedArea.ID, {
                Current_Quantity: movedArea.Current_Quantity - harvestQuantity,
            })
            ])
        }

        return res.status(200).send({
            status: true,
            message: 'Crop harvested successfully'
        });

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: 'Error in creating harvestStorage in database:' + error.message
        });
    }
}

exports.updateharvestStorage = (req, res) => {
    try {
        let harvestStorage = new HarvestStorage(req.body);

        harvestStorage.Id = req.params.Id
        HarvestStorage.updateharvestStorage(harvestStorage, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating harvestStorage in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating harvestStorage in database'
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
            message: 'Error in updating harvestStorage in database. Record may not exist:' + error
        });
    }
}

exports.deleteharvestStorage = (req, res) => {
    try {
        const Id = req.params.Id

        harvestStorage.deleteharvestStorage(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting harvestStorage medium in database'
                });
                return;
            }

            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'harvestStorage does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'harvestStorage deleted successfully.'
            });
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'An error occurred while deleting your record'
        });
    }

};



