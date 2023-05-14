const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const Culture = require('../models/culture');
const db = require('../config/dbConnection');

exports.getAllCultures = (req, res) => {
    const sql = `
      SELECT c.*, p.Plant_Name, cm.Culture_Medium_Name
      FROM culture c
      JOIN plant p ON c.Plant_ID = p.Plant_ID
      JOIN culture_medium_relation cmr ON c.Culture_ID = cmr.culture_id
      JOIN culture_medium cm ON cmr.culture_medium_id = cm.Culture_Medium_ID
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({ status: 'error', message: err.message });
      } else {
        res.send({ status: 'success', result: result });
      }
    });
  };
  
  exports.getCulture = (req, res) => {
    const sql = `
      SELECT c.*, p.Plant_Name, cm.Culture_Medium_Name
      FROM culture c
      JOIN plant p ON c.Plant_ID = p.Plant_ID
      JOIN culture_medium_relation cmr ON c.Culture_ID = cmr.culture_id
      JOIN culture_medium cm ON cmr.culture_medium_id = cm.Culture_Medium_ID
      WHERE c.Culture_ID = ?
    `;
  
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  };
// exports.getAllCultures = (req, res) => {
//     try {
//         Culture.findAll((err, result) => {
//             if (err) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Error retrieving culture data from database:' + err.message
//                 });
//                 return;
//             }
//             if (result != undefined) {

//                 res.status(200).send({
//                     status: true,
//                     message: 'Success',
//                     result: result
//                 });
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

// exports.getCulture = (req, res) => {
//     try {
//         let { Id } = req.params
//         console.log(req.params)

//         Culture.findById(Id, (err, result) => {
//             if (err) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Error retrieving culture data from database:' + err.message
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

exports.addCulture = (req, res) => {
    try {
        const culture = new Culture(req.body);

        Culture.createCulture(culture, (err, result) => {
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
                        message: 'Error in creating culture in database:' + err.message
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error in creating culture in database'
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
            message: 'Error in creating culture in database:' + error.message
        });
    }
}

exports.updateCulture = (req, res) => {
    try {
        let culture = new Culture(req.body);

        culture.Culture_ID = req.params.Id
        Culture.updateCulture(culture, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in updating culture in database:' + err.message
                });

                return;
            }

            else if (result < 1) {
                console.log(result)
                res.status(500).send({
                    status: false,
                    message: 'Error in updating culture in database'
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
            message: 'Error in updating culture in database. Record may not exist:' + error.message
        });
    }
}

exports.deleteCulture = (req, res) => {
    try {
        const Id = req.params.Id

        Culture.deleteCulture(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error deleting culture medium in database'
                });
                return;
            }

            else if (result < 1) {
                res.status(200).send({
                    status: false,
                    message: 'Culture does not exist with this id'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Culture deleted successfully.'
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




