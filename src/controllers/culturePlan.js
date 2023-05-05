const culturePlan = require("../models/culturePlan");
const movedArea = require("../models/movedArea");
const harvestStorage = require("../models/harvestStorage");
const trash = require("../models/trash");
const Area = require("../models/area");
const encryption = require("../helper/encryption");
const auth = require("basic-auth");

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
        let response = {
          status: true,
          message: "Success",
          result: result,
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
    // const culture_plan = new culturePlan(req.body);
    let areaId;

    const culture_plan = new culturePlan(req.body);

    let Id;
    culturePlan.createCulturePlan(culture_plan, (err, result) => {
      Id = result.insertId;

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
            message: "Error in creating culture plan in database",
          });
        }
        return;
      } else if (result.affectedRows < 1) {
        res.status(500).send({
          status: false,
          message: "Error in creating culture plan in database",
        });
        return;
      }

      culturePlan.findById(Id, (err, result) => {
        if (err) {
          res.status(500).send({
            status: false,
            message: "Error retrieving culture plan data from database",
          });
          return;
        }
        if (result != undefined) {
          culturePlanPayload = result;

          if (culturePlanPayload.Status == "location change") {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Name: culturePlanPayload.Area,
              Initial_Quantity:
                culturePlanPayload.INITIAL_AREA_CURRENT_QUANTITY,
              Current_Quantity:
                culturePlanPayload.INITIAL_AREA_INITIAL_QUANTITY,
              Transition_Time: culturePlanPayload.Transition_Time,
              Remaining_Days: culturePlanPayload.Remaining_Days,
              Created_Date: culturePlanPayload.Created_Date,
            };
            movedArea.createmovedArea(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating moved area in database",
                });
                return;
              }
            });
          } else if (culturePlanPayload.Status == "harvest") {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Source_Area_Name: culturePlanPayload.Area,
            };
            harvestStorage.createharvestStorage(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating harvest storage in database",
                });
                return;
              }
            });
          } else if (culturePlanPayload.Status == "delete") {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Source_Area_Name: req.body.Area,
            };
            trash.createtrash(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating trash in database",
                });
                return;
              }
            });
          } else {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Name: culturePlanPayload.Area,
              Initial_Quantity:
                culturePlanPayload.INITIAL_AREA_CURRENT_QUANTITY,
              Current_Quantity:
                culturePlanPayload.INITIAL_AREA_INITIAL_QUANTITY,
              Transition_Time: culturePlanPayload.Transition_Time,
              Remaining_Days: culturePlanPayload.Remaining_Days,
              Created_Date: culturePlanPayload.Created_Date,
            };
            movedArea.createmovedArea(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating moved area in database",
                });
                return;
              }
            });
          }
          res.status(200).send({
            status: true,
            message: "Record added successfully",
          });
        } else {
          res.status(500).send({
            status: false,
            message: "Something went wrong",
          });
          return;
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in creating culture plan in database:" + error,
    });
  }
};

exports.updateCulturePlan = (req, res) => {
  try {
    let culture_plan = new culturePlan(req.body);

    culture_plan.Culture_Plan_ID = req.params.Id;
console.log("culture_plan",culture_plan)
    culturePlan.updateCulturePlan(culture_plan, (err, result) => {
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
            message: "Error in updating culture plan in database:"+err,
          });
        }
        return;
      } else if (result < 1) {
        console.log(result);
        res.status(500).send({
          status: false,
          message: "Error in updating culture plan in database",
        });
        return;
      }

      culturePlan.findById( req.params.Id, (err, result) => {
        if (err) {
          res.status(500).send({
            status: false,
            message: "Error retrieving culture plan data from database",
          });
          return;
        }
        if (result != undefined) {
          culturePlanPayload = result;

          if (culturePlanPayload.Status == "location change") {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Name: culturePlanPayload.Area,
              Initial_Quantity:
                culturePlanPayload.INITIAL_AREA_CURRENT_QUANTITY,
              Current_Quantity:
                culturePlanPayload.INITIAL_AREA_INITIAL_QUANTITY,
              Transition_Time: culturePlanPayload.Transition_Time,
              Remaining_Days: culturePlanPayload.Remaining_Days,
              Created_Date: culturePlanPayload.Created_Date,
            };
            movedArea.createmovedArea(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating moved area in database",
                });
                return;
              }
            });
          } else if (culturePlanPayload.Status == "harvest") {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Source_Area_Name: culturePlanPayload.Area,
            };
            harvestStorage.createharvestStorage(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating harvest storage in database",
                });
                return;
              }
            });
          } else if (culturePlanPayload.Status == "delete") {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Source_Area_Name: req.body.Area,
            };
            trash.createtrash(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating trash in database",
                });
                return;
              }
            });
          } else {
            let payload = {
              Crop_UID: culturePlanPayload.Culture_Plan_ID,
              Name: culturePlanPayload.Area,
              Initial_Quantity:
                culturePlanPayload.INITIAL_AREA_CURRENT_QUANTITY,
              Current_Quantity:
                culturePlanPayload.INITIAL_AREA_INITIAL_QUANTITY,
              Transition_Time: culturePlanPayload.Transition_Time,
              Remaining_Days: culturePlanPayload.Remaining_Days,
              Created_Date: culturePlanPayload.Created_Date,
            };
            movedArea.createmovedArea(payload, (err, result) => {
              if (err) {
                res.status(500).send({
                  status: false,
                  message: "Error creating moved area in database",
                });
                return;
              }
            });
          }
          res.status(200).send({
            status: true,
            message: "Record Updated successfully",
          });
        } else {
          res.status(500).send({
            status: false,
            message: "Something went wrong",
          });
          return;
        }
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message:
        "Error in updating culture plan in database. Record may not exist",
    });
  }
};

exports.deleteCulturePlan = (req, res) => {
  try {
    const Id = req.params.Id;

    culturePlan.deleteCulturePlan(Id, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error deleting culture plan in database",
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
        message: "Culture Plan deleted successfully.",
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occured while deleting your record",
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
      message: "An error occured while deleting your record",
    });
  }
};