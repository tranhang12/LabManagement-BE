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
        const { Culture_Plan_ID, Source_Area_Name, Destination_Area_Name, Quantity, Transition_Time } = req.body
        if (
            !Culture_Plan_ID || !Source_Area_Name || !Source_Area_Name || !Quantity
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
                    MovedArea.updateMovedAreaQuantityAndTransitionTime(movedArea[foundIndex].ID, {
                        Current_Quantity: newDestinationQuantity,
                        Transition_Time: Transition_Time,
                    }),
                    CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, {
                        Current_Quantity: newSourceQuantity,
                    })
                ])

                return res.status(200).send({
                    status: true,
                    message: 'Record added successfully'
                });
            } else {
                await Promise.all([
                    CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, {
                        Current_Quantity: newSourceQuantity,
                    }),
                    MovedArea.createMovedAreaPromise({
                        Culture_Plan_ID: culturePlanId,
                        Area_Name: Destination_Area_Name,
                        Initial_Quantity: Quantity,
                        Current_Quantity: Quantity,
                        Remaining_Days: 0,
                        Transition_Time: Transition_Time
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
                    CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, {
                        Current_Quantity: newDestinationCurrentQuantity,
                        Transition_Time: Transition_Time
                    }),
                    MovedArea.updateMovedAreaQuantityAndTransitionTime(sourceMovedArea.ID, {
                        Current_Quantity: newSourceQuantity
                    }),
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
                    MovedArea.updateMovedAreaQuantityAndTransitionTime(sourceMovedArea.ID, {
                        Current_Quantity: newSourceQuantity
                    }),
                    MovedArea.updateMovedAreaQuantityAndTransitionTime(destinationMovedArea.ID, {
                        Current_Quantity: newDestinationQuantity,
                        Transition_Time: Transition_Time
                    }),
                ])

                return res.status(200).send({
                    status: true,
                    message: 'Record added successfully'
                });
            } else {
                await Promise.all([
                    MovedArea.updateMovedAreaQuantityAndTransitionTime(sourceMovedArea.ID, {
                        Current_Quantity: newSourceQuantity
                    }),
                    MovedArea.createMovedAreaPromise({
                        Culture_Plan_ID: culturePlanId,
                        Area_Name: Destination_Area_Name,
                        Initial_Quantity: Quantity,
                        Current_Quantity: Quantity,
                        Remaining_Days: 0,
                        Transition_Time: Transition_Time
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

exports.updateMovedAreaCurrentQuantity = async (req, res) => {
    try {
        const {Culture_Plan_ID, New_Current_Quantity, Area_Name} = req.body
        const culturePlanId = +Culture_Plan_ID;
        const newCurrentQuantity = +New_Current_Quantity;
        if (newCurrentQuantity < 0 || !Area_Name || !Culture_Plan_ID) { 
            return res.status(400).send({
                status: false,
                message: 'Invalid request body'
            });
        }
        const culturePlan = await CulturePlan.findByIdPromise(culturePlanId)
        if (!culturePlan) {
            return res.status(400).send({
                status: false,
                message: 'Culture plan not found'
            });
        }

        if (culturePlan.Area === Area_Name) {
            await CulturePlan.updateCulturePlanCurrentQuantity(culturePlanId, {
                Current_Quantity: newCurrentQuantity
            })
            return res.status(200).send({
                status: true,
                message: 'Record updated successfully'
            });
        }

        const movedArea = await MovedArea.findAllByCulturePlanIdPromise(culturePlanId)
        const foundIndex = movedArea.findIndex(e => e.Area_Name === Area_Name)
        if (foundIndex === -1) {
            return res.status(400).send({
                status: false,
                message: 'Area not found'
            });
        }

        await MovedArea.updateMovedAreaQuantityAndTransitionTime(movedArea[foundIndex].ID, {
            Current_Quantity: newCurrentQuantity
        })

        return res.status(200).send({
            status: true,
            message: 'Record updated successfully'
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



exports.getAllMovedAreaOfCulturePlan = async (req, res) => {
    try {
        const { Culture_Plan_ID } = req.query
        if (!Culture_Plan_ID) {
            return res.status(400).send({
                status: false,
                message: 'Invalid request'
            });
        }
        const movedArea = await MovedArea.findAllByCulturePlanIdAndCurrentQuantityLargerThanZero(+Culture_Plan_ID)

        res.status(200).send({
            status: true,
            result: movedArea.map(e => ({
                ID: e.ID,
                Culture_Plan_ID: e.Culture_Plan_ID,
                Area_Name: e.Area_Name,
                Initial_Quantity: e.Initial_Quantity,
                Current_Quantity: e.Current_Quantity,
                Transition_Time: e.Transition_Time,
                Remaining_Days: Math.ceil((e.Transition_Time.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))
            }))
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: 'Error in getting movedArea in database:' + error.message
        });
    }
}