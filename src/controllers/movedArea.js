const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const MovedArea = require('../models/movedArea');
const CulturePlan = require('../models/culturePlan');


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

exports.addmovedArea = async (req, res) => {
    try {
        const { Culture_Plan_ID, Source_Area_Name, Destination_Area_Name, Quantity } = req.body
        if (
            !Culture_Plan_ID || !Source_Area_Name|| !Source_Area_Name || !Quantity
        ) {
            return res.status(400).send('Missing or invalid input');
        }
        const culturePlanId = +Culture_Plan_ID;
        // const movedArea = new MovedArea(req.body);

        const culturePlan = await CulturePlan.findByIdPromise(culturePlanId)
        const movedArea = await MovedArea.findAllByCulturePlanIdPromise(culturePlanId)

        if (culturePlan.Area === Source_Area_Name) {
            // Move culture plan from initial area
            const sourceQuantity = culturePlan.Current_Quantity
            if (sourceQuantity < Quantity) {
                return res.status(400).send({
                    status: false,
                    message: 'The transfer quantity exceeds the current quantity'
                });
            }

            const newSourceQuantity = sourceQuantity - Quantity 
            const foundIndex = movedArea.findIndex(e => e.Area_Name === Destination_Area_Name)
            if (foundIndex !== -1) {
                // If Destination_Area_Name already in moved area
                const newDestinationQuantity = movedArea[foundIndex].Current_Quantity + Quantity
                
                await Promise.all([
                    MovedArea.updateMovedAreaCurrentQuantity(movedArea[foundIndex].ID, newDestinationQuantity),
                    CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, newSourceQuantity)
                ])

                return res.status(200).send({
                    status: true,
                    message: 'Record added successfully'
                });
            } else {
                await Promise.all([
                    CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, newSourceQuantity),
                    MovedArea.createMovedAreaPromise({
                        Culture_Plan_ID: culturePlanId,
                        Area_Name: Destination_Area_Name,
                        Initial_Quantity: Quantity,
                        Current_Quantity: Quantity,
                        Remaining_Days: 0,
                        Transition_Time: new Date()
                    })
                ])
                return res.status(200).send({
                    status: true,
                    message: 'Record added successfully'
                });
            }         

        } else {
            // Move culture plan from moved area
            const sourceMovedAreaIndex = movedArea.findIndex(e => e.Area_Name === Source_Area_Name)
            if (sourceMovedAreaIndex === -1) {
                return res.status(400).send({
                    status: false,
                    message: 'Transfer area not found'
                });
            }

            const sourceMovedArea = movedArea[sourceMovedAreaIndex]
            const sourceQuantity = sourceMovedArea.Current_Quantity
            if (sourceQuantity < Quantity) {
                return res.status(400).send({
                    status: false,
                    message: 'The transfer quantity exceeds the current quantity'
                });
            }
            const newSourceQuantity = sourceQuantity - Quantity

            if (Destination_Area_Name === culturePlan.Area) {
                const newDestinationCurrentQuantity = culturePlan.Current_Quantity + Quantity
                await Promise.all([
                    CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, newDestinationCurrentQuantity),
                    MovedArea.updateMovedAreaCurrentQuantity(sourceMovedArea.ID, newSourceQuantity),
                ])
                return res.status(200).send({
                    status: true,
                    message: 'Record added successfully'
                });
            }


            const destinationMovedAreaIndex = movedArea.findIndex(e => e.Area_Name === Destination_Area_Name)
            if (destinationMovedAreaIndex !== -1) {
                // If Destination_Area_Name already in moved area
                const destinationMovedArea = movedArea[destinationMovedAreaIndex]
                const newDestinationQuantity = destinationMovedArea.Current_Quantity + Quantity
                
                await Promise.all([
                    MovedArea.updateMovedAreaCurrentQuantity(sourceMovedArea.ID, newSourceQuantity),
                    MovedArea.updateMovedAreaCurrentQuantity(destinationMovedArea.ID, newDestinationQuantity),
                ])

                return res.status(200).send({
                    status: true,
                    message: 'Record added successfully'
                });
            } else {
                await Promise.all([
                    MovedArea.updateMovedAreaCurrentQuantity(sourceMovedArea.ID, newSourceQuantity),
                    MovedArea.createMovedAreaPromise({
                        Culture_Plan_ID: culturePlanId,
                        Area_Name: Destination_Area_Name,
                        Initial_Quantity: Quantity,
                        Current_Quantity: Quantity,
                        Remaining_Days: 0,
                        Transition_Time: new Date()
                    })
                ])
                return res.status(200).send({
                    status: true,
                    message: 'Record added successfully'
                });
            }      
        }
    }
    catch (error) {
        console.log(error)
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



