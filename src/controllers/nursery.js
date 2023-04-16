
const Nursery = require('../models/nursery');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');

exports.getAllNurseries = (req, res) => {
    try {
        Nursery.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving nurseries data from database'
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

exports.getNursery = (req, res) => {
    try {
        let { Id } = req.params;

        Nursery.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving nursery data from database'
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

exports.addNursery = (req, res) => {
    try {
        const nursery = new Nursery(req.body);

        Nursery.createNursery(nursery, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating nursery in database'
                });
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating nursery in database'
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
            message: 'Error in creating nursery in database'
        });
    }
}

exports.updateNursery = (req, res) => {
    try {
        let nursery = new Nursery(req.body);

        nursery.Nursery_ID = req.params.Id;

        Nursery.updateNursery(nursery, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating nursery in database'
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating nursery in database'
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
            message: 'Error in updating nursery in database. Record may not exist'
        });
    }
}

exports.deleteNursery = (req, res) => {
    try {
        const Id = req.params.Id;

        Nursery.deleteNursery(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting nursery in database'
                });
                return;
            }
            
            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'Nursery does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Nursery deleted successfully.'
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




