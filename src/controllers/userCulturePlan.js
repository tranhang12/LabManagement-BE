const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const UserCulturePlan = require('../models/userCulturePlan');


exports.getAlluserCulturePlans = (req, res) => {
    try {
        UserCulturePlan.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving userCulturePlan data from database:' + err.message
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

// exports.UserCulturePlan = (req, res) => {
//     try {
//         let { Id } = req.params
//         console.log(req.params)

//         UserCulturePlan.findById(Id, (err, result) => {
//             if (err) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Error retrieving userCulturePlan data from database:' + err.message
//                 });
//                 return;
//             }
//             if (result != undefined) {
//                 let response = {
//                     status: true,
//                     message: 'Success',
//                     result: result
//                 }

//                 res.status(200).send(response);

//             } else {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Something went wrong'
//                 });
//                 return;
//             }
//         });

//     } catch (error) {
//         res.status(500).send({
//             status: false,
//             message: 'Error in getting data from Database:' + error.message
//         });
//     }
// };

exports.adduserCulturePlan = (req, res) => {
    try {
        const userCulturePlan = new UserCulturePlan(req.body);

        UserCulturePlan.createuserCulturePlan(userCulturePlan, (err, result) => {
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
                        message: 'Error in creating userCulturePlan in database:' + err.message
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating userCulturePlan in database'
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
            message: 'Error in creating userCulturePlan in database:' + error.message
        });
    }
}

exports.updateuserCulturePlan = (req, res) => {
    try {
        let userCulturePlan = new userCulturePlan(req.body);

        userCulturePlan.Id = req.params.Id
        userCulturePlan.updateuserCulturePlan(userCulturePlan, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating userCulturePlan in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating userCulturePlan in database'
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
            message: 'Error in updating userCulturePlan in database. Record may not exist:' + error
        });
    }
}

// exports.deleteuserCulturePlan = (req, res) => {
//     try {
//         const Id = req.params.Id

//         userCulturePlan.deleteuserCulturePlan(Id, (err, result) => {
//             if (err) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Error deleting userCulturePlan medium in database'
//                 });
//                 return;
//             }

//             else if (result < 1) {
//                 res.status(200).send({
//                     status: false,
//                     message: 'userCulturePlan does not exist with this id'
//                 });
//                 return;
//             }

//             res.status(200).send({
//                 status: true,
//                 message: 'userCulturePlan deleted successfully.'
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



