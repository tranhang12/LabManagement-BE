const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const MovedArea = require('../models/movedArea');


exports.getAllmovedAreas = (req, res) => {
    try {
        MovedArea.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving movedArea data from database:' + err.message
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

exports.getmovedArea = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        movedArea.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving movedArea data from database:' + err.message
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

exports.addmovedArea = (req, res) => {
    try {
        const movedArea = new MovedArea(req.body);

        MovedArea.createmovedArea(movedArea, (err, result) => {
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
                        message: 'Error in creating movedArea in database:' + err.message
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating movedArea in database'
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
            message: 'Error in creating movedArea in database:' + error.message
        });
    }
}

exports.updatemovedArea = (req, res) => {
    try {
        let movedArea = new MovedArea(req.body);

        movedArea.Id = req.params.Id
        MovedArea.updatemovedArea(movedArea, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating movedArea in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating movedArea in database'
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
            message: 'Error in updating movedArea in database. Record may not exist:' + error
        });
    }
}

exports.deletemovedArea = (req, res) => {
    try {
        const Id = req.params.Id

        movedArea.deletemovedArea(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting movedArea medium in database'
                });
                return;
            }

            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'movedArea does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'movedArea deleted successfully.'
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



