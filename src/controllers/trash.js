const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const Trash = require('../models/trash');


exports.getAlltrashs = (req, res) => {
    try {
        Trash.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving trash data from database:' + err.message
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

exports.gettrash = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        trash.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving trash data from database:' + err.message
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

exports.addtrash = (req, res) => {
    try {
        const trash = new Trash(req.body);

        Trash.createtrash(trash, (err, result) => {
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
                        message: 'Error in creating trash in database:' + err.message
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating trash in database'
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
            message: 'Error in creating trash in database:' + error.message
        });
    }
}

exports.updatetrash = (req, res) => {
    try {
        let trash = new Trash(req.body);

        trash.Id = req.params.Id
        Trash.updatetrash(trash, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating trash in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating trash in database'
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
            message: 'Error in updating trash in database. Record may not exist:' + error
        });
    }
}

// exports.deletetrash = (req, res) => {
//     try {
//         const Id = req.params.Id

//         trash.deletetrash(Id, (err, result) => {
//             if (err) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Error deleting trash medium in database'
//                 });
//                 return;
//             }

//             else if (result < 1) {
//                 res.status(200).send({
//                     status: false,
//                     message: 'trash does not exist with this id'
//                 });
//                 return;
//             }

//             res.status(200).send({
//                 status: true,
//                 message: 'trash deleted successfully.'
//             });
//         });
//     }
//     catch (error) {
//         res.status(500).send({
//             status: false,
//             message: 'An error occured while deleting your record'
//         });
//     }

// };



