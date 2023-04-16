const GrowthParameters = require('../models/growthParameters');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');


exports.getAllGrowthParameters = (req, res) => {
    try {
        GrowthParameters.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving growthParameters data from database:' + err.message
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
exports.getGrowthParameter = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        GrowthParameters.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving growthParameters data from database:' + err.message
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
exports.addGrowthParameter = (req, res) => {
    try {
        const growthParameters = new GrowthParameters(req.body);

        GrowthParameters.createGrowthParameters(growthParameters, (err, result) => {
            if (err) {

                res.status(500).send({
                    status: false,
                    message: 'Error in creating growthParameters in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating growthParameters in database'
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
            message: 'Error in creating growthParameters in database:' + error.message
        });
    }
}
exports.updateGrowthParameter = (req, res) => {
    try {
        let growthParameters = new GrowthParameters(req.body);

        growthParameters.Id = req.params.Id
        // console.log("growthParameters", growthParameters)
        GrowthParameters.updateGrowthParameters(growthParameters, (err, result) => {
            if (err) {
                //console.log(err)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating growthParameters in database:' + err.message
                });


                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating growthParameters in database'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Record updated successfully',
                result: result
            });
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in updating growthParameters in database.Record may not exist:' + error.message
        });
    }
}
exports.deleteGrowthParameter = (req, res) => {
    try {

        const Id = req.params.Id
        let flag = true

        GrowthParameters.findById(Id, (err, result) => {
            if (err) {
                flag = false
                console.log(err)
            } else {
                if (result.length > 0) {
                    let response = {
                        status: true,
                        message: 'Success',
                        result: result
                    }
                    flag = true
                } else {
                    flag = false
                }
            }

            console.log(flag)
            if (flag) {
                GrowthParameters.deleteGrowthParameters(Id, (err, result) => {
                    if (err || result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting growthParameters in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'GrowthParameters deleted successfully.'
                    });
                    return;
                });
            }
            else {
                res.status(200).send({
                    status: false,
                    message: 'GrowthParameters does not exist with this id'
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in deleting growth parameter in database.Record may not exist:' + error.message
        });
    }
}




