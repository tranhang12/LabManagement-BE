const CultureMediumRelation = require('../models/cultureMediumRelation');

exports.getAllRelations = (req, res) => {
    try {
        CultureMediumRelation.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving relations data from database'
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

exports.addRelation = (req, res) => {
    try {
        const relation = new CultureMediumRelation(req.body);

        CultureMediumRelation.createRelation(relation, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating relation in database'
                });
                return;
            } else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating relation in database'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Record added successfully'
            });
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in creating relation in database'
        });
    }
}

exports.deleteRelation = (req, res) => {
    try {
        const { cultureId, cultureMediumId } = req.params;

        CultureMediumRelation.deleteRelation(cultureId, cultureMediumId, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting relation in database'
                });
                return;
            } else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'Relation does not exist with these ids'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Relation deleted successfully.'
            });
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'An error occurred while deleting the record'
        });
    }
};
