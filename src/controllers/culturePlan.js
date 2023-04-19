
const culturePlan = require('../models/culturePlan');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');

exports.getAllCulturePlans = (req, res) => {
    try {
        culturePlan.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving culture plans data from database'
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

exports.getCulturePlan = (req, res) => {
    try {
        let { Id } = req.params;

        culturePlan.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving culture plan data from database'
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

exports.addCulturePlan = (req, res) => {
    try {
        const culture_plan = new culturePlan(req.body);

        culturePlan.createCulturePlan(culture_plan, (err, result) => {
            if (err) {
                if (err.code.includes("ER_NO_REFERENCED_ROW")) {
                    res.status(500).send({
                        status: false,
                        message: 'Foreign Key Constraint is failing. Provided Area does not exist'
                    });
                }
                else {
                    res.status(500).send({
                        status: false,
                        message: 'Error in creating culture plan in database'
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating culture plan in database'
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
            message: 'Error in creating culture plan in database'
        });
    }
}

exports.updateCulturePlan = (req, res) => {
    try {
        let culture_plan = new culturePlan(req.body);

        culture_plan.Culture_Plan_ID = req.params.Id;

        culturePlan.updateCulturePlan(culture_plan, (err, result) => {
            if (err) {
                if (err.code.includes("ER_NO_REFERENCED_ROW")) {
                    res.status(500).send({
                        status: false,
                        message: 'Foreign Key Constraint is failing. Provided Area does not exist'
                    });
                }
                else {
                    res.status(500).send({
                        status: false,
                        message: 'Error in updating culture plan in database'
                    });
                }
                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating culture plan in database'
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
            message: 'Error in updating culture plan in database. Record may not exist'
        });
    }
}

exports.deleteCulturePlan = (req, res) => {
    try {
        const Id = req.params.Id;

        culturePlan.deleteCulturePlan(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting culture plan in database'
                });
                return;
            }
            
            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'Culture Plan does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Culture Plan deleted successfully.'
            });
        });  
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'An error occured while deleting your record'
        });
    }
        
};

exports.createOrUpdateMovement = (req, res) => {
    try {
        let culture_plan = new culturePlan(req.body);

        culture_plan.Culture_Plan_ID = req.params.Id;

        culturePlan.createOrUpdateMovement(culture_plan, (err, result) => {
            if (err) {
                if (err.code.includes("ER_NO_REFERENCED_ROW")) {
                    res.status(500).send({
                        status: false,
                        message: 'Foreign Key Constraint is failing. Provided Area does not exist'
                    });
                }
                else {
                    res.status(500).send({
                        status: false,
                        message: 'Error in creating or updating movement in database'
                    });
                }
                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in creating or updating movement in database'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Record created or updated successfully'
            });
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in creating or updating movement in database. Record may not exist'
        });
    }
}

exports.deleteMovement = (req, res) => {
    try {
        const Id = req.params.Id;

        culturePlan.deleteMovement(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting movement in database'
                });
                return;
            }
            
            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'Culture Plan does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Movement deleted successfully.'
            });
        });  
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'An error occured while deleting your record'
        });
    }
        
};