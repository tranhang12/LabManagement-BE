const Area = require("../models/area");
const encryption = require("../helper/encryption");
const auth = require("basic-auth");
const dbConnection = require('../config/dbConnection');

exports.getAllAreas = (req, res) => {
  try {
    dbConnection.query(`SELECT a.*, SUM(cp.Current_Quantity) AS Quantity
      FROM area a
      JOIN culture_plan cp ON a.Area_Name = cp.Area_Name
      GROUP BY a.Area_Name`, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error retrieving area data from database: " + err.message,
        });
        return;
      }
      if (result.length > 0) {
        res.status(200).send({
          status: true,
          message: "Success",
          result: result,
        });
      } else {
        res.status(500).send({
          status: false,
          message: "No data found",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in getting data from Database: " + error.message,
    });
  }
};


exports.getArea = (req, res) => {
  try {
    let { Id } = req.body;
    console.log(Id)

    Area.findById(Id, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error retrieving area data from database:" + err.message,
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
      message: "Error in getting data from Database:" + error.message,
    });
  }
};
exports.getAreaByName = (req, res) => {
  try {
    let { Name } = req.body;

   // console.log("req.body;",req.body);
    Area.findByName(Name, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error retrieving area data from database:" + err.message,
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
      message: "Error in getting data from Database:" + error.message,
    });
  }
};

exports.addArea = (req, res) => {
  try {
    const area = new Area(req.body);

    Area.createArea(area, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error in creating area in database:" + err.message,
        });

        return;
      } else if (result < 1) {
        res.status(500).send({
          status: false,
          message: "Error in creating area in database",
        });
        return;
      }

      res.status(200).send({
        status: true,
        message: "Record added successfully",
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in creating area in database:" + error.message,
    });
  }
};
exports.updateArea = (req, res) => {
  try {
    let area = new Area(req.body);

    area.Id = req.params.Id;
    // console.log("area", area)
    Area.updateArea(area, (err, result) => {
      if (err) {
        //console.log(err)
        res.status(500).send({
          status: false,
          message: "Error in updating area in database:" + err.message,
        });

        return;
      } else if (result < 1) {
        console.log(result);
        res.status(500).send({
          status: false,
          message: "Error in updating area in database",
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
        "Error in updating area in database.Record may not exist:" +
        error.message,
    });
  }
};
exports.deleteArea = (req, res) => {
  try {
    const Id = req.params.Id;
    let flag = true;

    Area.findById(Id, (err, result) => {
      if (err) {
        flag = false;
        console.log(err);
      } else {
        if (result.length > 0) {
          let response = {
            status: true,
            message: "Success",
            result: result,
          };
          flag = true;
        } else {
          flag = false;
        }
      }

      console.log(flag);
      if (flag) {
        Area.deleteArea(Id, (err, result) => {
          if (err || result < 1) {
            res.status(500).send({
              status: false,
              message: "Error deleting area in database",
            });
            return;
          }

          res.status(200).send({
            status: true,
            message: "Area deleted successfully.",
          });
          return;
        });
      } else {
        res.status(200).send({
          status: false,
          message: "Area does not exist with this id",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message:
        "Error in deleting area in database.Record may not exist:" +
        error.message,
    });
  }
};

exports.getAreasWithCulturePlan = (req, res) => {
  const { Culture_Plan_ID } = req.query
  const query = `
  select distinct *
  from (select Area_Name
        from culture_plan
                left join area on culture_plan.Area = area.Area_Name
        where Culture_Plan_ID = ? and Current_Quantity > 0
        union
        select Area_Name
        from culture_plan_moved_area
        where Culture_Plan_ID = ? and Current_Quantity > 0) a
  `;
  dbConnection.query(query, [Culture_Plan_ID, Culture_Plan_ID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.getAllAreas = (req, res) => {
const query = `
  SELECT * FROM area;
`;
dbConnection.query(query, (err, results) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  res.status(200).json(results);
});
};
