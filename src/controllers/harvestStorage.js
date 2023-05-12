const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const HarvestStorage = require('../models/harvestStorage');


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

        harvestStorage.findById(Id, (err, result) => {
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

exports.addharvestStorage = (req, res) => {
    try {
        const harvestStorage = new HarvestStorage(req.body);

        HarvestStorage.createharvestStorage(harvestStorage, (err, result) => {
            if (err) {
                if (err.code.includes("ER_NO_REFERENCED_ROW")) {
                    res.status(500).send({
                        status: false,
                        message: 'Foreign Key Constraint is failing'
                    });
                }
                else {
                    res.status(500).send({
                        status: false,
                        message: 'Error in creating harvestStorage in database:' + err.message
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating harvestStorage in database'
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



