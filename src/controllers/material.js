const Material = require("../models/material");

exports.getAllMaterials = (req, res) => {
  try {
    Material.findAll((err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message:
            "Error retrieving material data from database:" + err.message,
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

exports.getMaterial = (req, res) => {
  try {
    let { Id } = req.params;

    Material.findById(Id, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message:
            "Error retrieving material data from database:" + err.message,
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

exports.addMaterial = (req, res) => {
  try {
    const material = new Material(req.body);

    Material.createMaterial(material, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error in creating material in database:" + err.message,
        });
        return;
      } else if (result < 1) {
        res.status(500).send({
          status: false,
          message: "Error in creating material in database",
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
      message: "Error in creating material in database:" + error.message,
    });
  }
};

exports.updateMaterial = (req, res) => {
  try {
    let material = new Material(req.body);

    material.Id = req.params.Id;

    Material.updateMaterial(material, (err, result) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: "Error in updating material in database:" + err.message,
        });
        return;
      } else if (result < 1) {
        res.status(500).send({
          status: false,
          message: "Error in updating material in database",
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
        "Error in updating material in database.Record may not exist:" +
        error.message,
    });
  }
};

exports.deleteMaterial = (req, res) => {
  try {
    const Id = req.params.Id;
    let flag = true;
    Material.findById(Id, (err, result) => {
      if (err) {
        flag = false;
      } else {
        if (result.length > 0) {
          flag = true;
        } else {
          flag = false;
        }
      }

      if (flag) {
        Material.deleteMaterial(Id, (err, result) => {
          if (err || result < 1) {
            res.status(500).send({
              status: false,
              message: "Error deleting material in database",
            });
            return;
          }

          res.status(200).send({
            status: true,
            message: "Material deleted successfully.",
          });
          return;
        });
      } else {
        res.status(200).send({
          status: false,
          message: "Material does not exist with this id",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message:
        "Error in deleting material in database. Record may not exist:" +
        error.message,
    });
  }
};
