
const growthRecord = require('../models/growthRecord');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');

exports.getAllGrowthRecords = (req, res) => {
    try {
        growthRecord.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving growth records data from database'
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

exports.getGrowthRecord = (req, res) => {
    try {
        let { Id } = req.params;

        growthRecord.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving growth record data from database'
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

exports.addGrowthRecord = (req, res) => {
    try {
        const growth_record = new growthRecord(req.body);

        growthRecord.createGrowthRecord(growth_record, (err, result) => {
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
                        message: 'Error in creating growth record in database'
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating growth record in database'
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
            message: 'Error in creating growth record in database'
        });
    }
}

exports.updateGrowthRecord = (req, res) => {
    try {
        let growth_record = new growthRecord(req.body);

        growth_record.Growth_Record_ID = req.params.Id;

        growthRecord.updateGrowthRecord(growth_record, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating growth record in database'
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating growth record in database'
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
            message: 'Error in updating growth record in database. Record may not exist'
        });
    }
}

exports.deleteGrowthRecord = (req, res) => {
    try {
        const Id = req.params.Id;

        growthRecord.deleteGrowthRecord(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting growth record in database'
                });
                return;
            }
            
            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'Growth Record does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Growth Record deleted successfully.'
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




