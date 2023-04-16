const Lab = require('../models/lab');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');


exports.getAllLabs = (req, res) => {
    try {
        Lab.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving lab data from database:' + err.message
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
exports.getLab = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        Lab.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving lab data from database:' + err.message
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
exports.addLab = (req, res) => {
    try {
        const lab = new Lab(req.body);

        Lab.createLab(lab, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating lab in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating lab in database'
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
            message: 'Error in creating lab in database:' + error.message
        });
    }
}
exports.updateLab = (req, res) => {
    try {
        let lab = new Lab(req.body);

        lab.Id = req.params.Id
        // console.log("lab", lab)
        Lab.updateLab(lab, (err, result) => {
            if (err) {
                //console.log(err)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating lab in database:' + err.message
                });


                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating lab in database'
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
            message: 'Error in updating lab in database.Record may not exist:' + error.message
        });
    }
}
exports.deleteLab = (req, res) => {
    try {
        const Id = req.params.Id
        let flag = true

        Lab.findById(Id, (err, result) => {
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
                Lab.deleteLab(Id, (err, result) => {
                    if (err || result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting lab in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'Lab deleted successfully.'
                    });
                    return;
                });
            }
            else {
                res.status(200).send({
                    status: false,
                    message: 'Lab does not exist with this id'
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in deleting lab in database.Record may not exist:' + error.message
        });
    }
}




