const Field = require('../models/field');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');


exports.getAllFields = (req, res) => {
    try {
        Field.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving field data from database:' + err.message
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
exports.getField = (req, res) => {
    try {
        let { Id } = req.params
        console.log(req.params)

        Field.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving field data from database:' + err.message
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
exports.addField = (req, res) => {
    try {
        const field = new Field(req.body);

        Field.createField(field, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating field in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating field in database'
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
            message: 'Error in creating field in database:' + error.message
        });
    }
}
exports.updateField = (req, res) => {
    try {
        let field = new Field(req.body);

        field.Id = req.params.Id
        console.log("field", field)
        Field.updateField(field, (err, result) => {
            if (err) {
                //console.log(err)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating field in database:' + err.message
                });


                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating field in database'
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
            message: 'Error in updating field in database.Record may not exist:' + error.message
        });
    }
}
exports.deleteField = (req, res) => {
    try {
        const Id = req.params.Id
        let flag = true

        Field.findById(Id, (err, result) => {
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
                Field.deleteField(Id, (err, result) => {
                    if (err || result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting field in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'Field deleted successfully.'
                    });
                    return;
                });
            }
            else {
                res.status(200).send({
                    status: false,
                    message: 'Field does not exist with this id'
                });
            }

        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in deleting field in database.Record may not exist:' + error.message
        });
    }
}



