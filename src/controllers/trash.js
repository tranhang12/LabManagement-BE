const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const Trash = require('../models/trash');
const CulturePlan = require('../models/culturePlan');
const MovedArea = require('../models/movedArea');


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

exports.addtrash = async(req, res) => {
    try {

        const {
            Culture_Plan_ID,
            Area_Name,
            Quantity
        } = req.body

        const culturePlanId = +Culture_Plan_ID
        const culturePlan = await CulturePlan.findByIdPromise(culturePlanId)
        const movedAreas = await MovedArea.findAllByCulturePlanIdPromise(culturePlanId)
        const dumpQuantity = +Quantity


        if (culturePlan.Area === Area_Name) {
            if (culturePlan.Current_Quantity < dumpQuantity || dumpQuantity <= 0) {
                return res.status(400).send({
                    status: false,
                    message: 'Invalid dump quantity'
                });
            }
            
            await Promise.all([Trash.createTrashPromise({
                Culture_Plan_ID: culturePlanId,
                Quantity: dumpQuantity,
                Source_Area_Name: Area_Name
            }),
            CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, culturePlan.Current_Quantity - dumpQuantity)
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
            if (!(movedArea.Current_Quantity >= dumpQuantity && dumpQuantity <= 0)) {
                return res.status(400).send({
                    status: false,
                    message: 'Invalid dump quantity'
                });
            }

            await Promise.all([Trash.createTrashPromise({
                Culture_Plan_ID: culturePlanId,
                Quantity: dumpQuantity,
                Source_Area_Name: Area_Name
            }),
            MovedArea.updateMovedAreaCurrentQuantity(movedArea.ID, culturePlan.Current_Quantity - dumpQuantity)
            ])
        }

        return res.status(200).send({
            status: true,
            message: 'Crop dumped successfully'
        });


    }
    catch (error) {
        console.log(error)
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
//             message: 'An error occurred while deleting your record'
//         });
//     }

// };



