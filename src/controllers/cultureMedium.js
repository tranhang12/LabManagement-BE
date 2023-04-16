const cultureMedium = require('../models/cultureMedium');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');


exports.getAllCultureMediums = (req, res) => {
    try {
        cultureMedium.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving culture medium data from database:' + err.message
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
exports.getCultureMedium = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        cultureMedium.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving culture medium data from database:' + err.message
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
exports.addCultureMedium = (req, res) => {
    try {
        const culture_medium = new cultureMedium(req.body);

        cultureMedium.createCultureMedium(culture_medium, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating culture medium in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating culture medium in database'
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
            message: 'Error in creating culture medium in database:' + error.message
        });
    }
}
exports.updateCultureMedium = (req, res) => {
    try {
        let culture_medium = new cultureMedium(req.body);

        culture_medium.Id = req.params.Id
        // console.log("culture_medium", culture_medium)
        cultureMedium.updateCultureMedium(culture_medium, (err, result) => {
            if (err) {
                //console.log(err)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating culture medium in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating culture medium in database.Record may not exist'
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
            message: 'Error in updating culture medium in database.Record may not exist: ' + error.message
        });
    }
}
exports.deleteCultureMedium = (req, res) => {
    try {

        const Id = req.params.Id
        let flag = true

        cultureMedium.findById(Id, (err, result) => {
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


            if (flag) {
                cultureMedium.deleteCultureMedium(Id, (err, result) => {
                    if (err || result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting culture medium in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'Culture medium deleted successfully.'
                    });
                    return;
                });
            }
            else {
                res.status(200).send({
                    status: false,
                    message: 'Culture medium does not exist with this id'
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in deleting Culture medium in database.Record may not exist:' + error.message
        });
    }

}


