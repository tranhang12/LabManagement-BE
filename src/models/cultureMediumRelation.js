const connection = require('../config/dbConnection');

class CultureMediumRelation {
    constructor(relation) {
        this.Culture_ID = relation.Culture_ID;
        this.Culture_Medium_ID = relation.Culture_Medium_ID;
    }

    static findAll(result) {
        connection.query('SELECT * FROM culture_medium_relation', (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static findByRelation(cultureId, cultureMediumId, result) {
        connection.query('SELECT * FROM culture_medium_relation WHERE Culture_ID = ? AND Culture_Medium_ID = ?', [cultureId, cultureMediumId], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static createRelation(relation, result) {
        connection.query('INSERT INTO culture_medium_relation SET ?', relation, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static deleteRelation(cultureId, cultureMediumId, result) {
        const deleteQuery = 'DELETE FROM culture_medium_relation WHERE Culture_ID = ? AND Culture_Medium_ID = ?'

        connection.query(deleteQuery, [cultureId, cultureMediumId], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
}

module.exports = CultureMediumRelation;
