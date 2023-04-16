const GreenHouse = require('../models/greenHouse');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');


exports.getAllGreenHouses = (req, res) => {
    try {
        GreenHouse.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving greenHouse data from database:' + err.message
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
exports.getGreenHouse = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        GreenHouse.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving greenHouse data from database:' + err.message
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
exports.addGreenHouse = (req, res) => {
    try {
        const greenHouse = new GreenHouse(req.body);

        GreenHouse.createGreenHouse(greenHouse, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating greenHouse in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating greenHouse in database'
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
            message: 'Error in creating greenHouse in database:' + error.message
        });
    }
}
exports.updateGreenHouse = (req, res) => {
    try {
        let greenHouse = new GreenHouse(req.body);

        greenHouse.Id = req.params.Id
        // console.log("greenHouse", greenHouse)
        GreenHouse.updateGreenHouse(greenHouse, (err, result) => {
            if (err) {

                res.status(500).send({
                    status: false,
                    message: 'Error in updating greenHouse in database:' + err.message
                });


                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating greenHouse in database'
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
            message: 'Error in updating greenHouse in database.Record may not exist:' + error.message
        });
    }
}
exports.deleteGreenHouse = (req, res) => {
    try {
        const Id = req.params.Id
        let flag = true

        GreenHouse.findById(Id, (err, result) => {
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
                GreenHouse.deleteGreenHouse(Id, (err, result) => {
                    if (err || result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting greenHouse in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'GreenHouse deleted successfully.'
                    });
                    return;
                });
            }
            else {
                res.status(200).send({
                    status: false,
                    message: 'GreenHouse does not exist with this id'
                });
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in deleting  greenHouse in database.Record may not exist:' + error.message
        });
    }
}




