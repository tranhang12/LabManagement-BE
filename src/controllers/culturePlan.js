const culturePlan = require("../models/culturePlan");
const movedArea = require("../models/movedArea");
const harvestStorage = require("../models/harvestStorage");
const trash = require("../models/trash");
const Area = require("../models/area");
const encryption = require("../helper/encryption");
const auth = require("basic-auth");
const CulturePlan = require("../models/culturePlan");

exports.getAllCulturePlans = (req, res) => {
  try {
    culturePlan.findAll((err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error retrieving culture plans data from database",
        });
        return;
      }
      if (result != undefined) {
        res.status(200).send({
          status: true,
          message: "Success",
          result: result,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "Something went wrong",
        });
        return;
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in getting data from Database",
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
          message: "Error retrieving culture plan data from database",
        });
        return;
      }
      
      if (result != undefined) {
        const Remaining_Days = Math.ceil((result.Transition_Time.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))
        let response = {
          status: true,
          message: "Success",
          result: {
            ...result,
            Remaining_Days
          },
        };

        res.status(200).send(response);
      } else {
        res.status(500).send({
          status: false,
          message: "Something went wrong",
        });
        return;
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in getting data from Database",
    });
  }
};

exports.addCulturePlan = (req, res) => {
  try {
    const culturePlan = new CulturePlan(req.body);

    CulturePlan.createCulturePlan(culturePlan, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error in creating culturePlan in database:" + err.message,
        });
        return;
      } else if (result < 1) {
        res.status(500).send({
          status: false,
          message: "Error in creating culturePlan in database",
        });
        return;
      }

      res.status(200).send({
        status: true,
        message: "Record added successfully",
      });
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in creating culturePlan in database:" + error.message,
    });
  }
};

exports.updateCulturePlan = (req, res) => {
  try {
    let culturePlan = new CulturePlan(req.body);

    culturePlan.Id = req.params.Id;

    CulturePlan.updateCulturePlan(culturePlan, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error in updating culturePlan in database:" + err.message,
        });
        return;
      } else if (result < 1) {
        res.status(500).send({
          status: false,
          message: "Error in updating culturePlan in database",
        });
        return;
      }

      res.status(200).send({
        status: true,
        message: "Record updated successfully",
        result: result,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message:
        "Error in updating culturePlan in database. Record may not exist:" +
        error.message,
    });
  }
};

exports.deleteCulturePlan = (req, res) => {
  try {
      const Id = req.params.Id;

      CulturePlan.deleteCulturePlan(Id, (err, result) => {
          if (err) {
              res.status(500).send({
                  status: false,
                  message: 'Error deleting Culture plan in database'
              });
              return;
          }
          
          else if (result < 1) {
              res.status(200).send({
                  status: false,
                  message: 'Culture plan does not exist with this id'
              });
              return;
          }

          res.status(200).send({
              status: true,
              message: 'Culture plan deleted successfully.'
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

exports.createOrUpdateMovement = (req, res) => {
  try {
    let culture_plan = new culturePlan(req.body);

    culture_plan.Culture_Plan_ID = req.params.Id;

    culturePlan.createOrUpdateMovement(culture_plan, (err, result) => {
      if (err) {
        if (err.code.includes("ER_NO_REFERENCED_ROW")) {
          res.status(500).send({
            status: false,
            message:
              "Foreign Key Constraint is failing. Provided Area does not exist",
          });
        } else {
          res.status(500).send({
            status: false,
            message: "Error in creating or updating movement in database",
          });
        }
        return;
      } else if (result < 1) {
        //console.log(result);
        res.status(500).send({
          status: false,
          message: "Error in creating or updating movement in database",
        });
        return;
      }

      res.status(200).send({
        status: true,
        message: "Record created or updated successfully",
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message:
        "Error in creating or updating movement in database. Record may not exist",
    });
  }
};

exports.deleteMovement = (req, res) => {
  try {
    const Id = req.params.Id;

    culturePlan.deleteMovement(Id, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error deleting movement in database",
        });
        return;
      } else if (result < 1) {
        res.status(200).send({
          status: false,
          message: "Culture Plan does not exist with this id",
        });
        return;
      }

      res.status(200).send({
        status: true,
        message: "Movement deleted successfully.",
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while deleting your record",
    });
  }
};