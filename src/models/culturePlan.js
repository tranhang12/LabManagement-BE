const connection = require("../config/dbConnection");

class CulturePlan {
  constructor(culturePlan) {
    this.Area = culturePlan.Area;
    this.Plant_Type = culturePlan.Plant_Type;
    // this.Container_Quantity = culturePlan.Container_Quantity;
    this.Container_Type = culturePlan.Container_Type;
    this.Created_Date = culturePlan.Created_Date;
    this.Transition_Time = culturePlan.Transition_Time;
    this.BatchID = culturePlan.BatchID;
    this.Status = culturePlan.Status;
    this.Initial_Quantity = +culturePlan.Initial_Quantity;
    this.Current_Quantity = +culturePlan.Current_Quantity;
  }

  static findAll(result) {
    connection.query("SELECT * FROM culture_plan", (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static findAllPromise() {
    return new Promise((resolve, reject) => {
      connection.query(
        `select
        *
      from
        (
        select
          cp.*,
          (cp.Current_Quantity + IFNULL(f.Current_Quantity, 0)) as Aggregate_Current_Quantity,
          (DATEDIFF(cp.Transition_Time, CURRENT_DATE)) as Remaining_Days
        from
          culture_plan cp
        left join (
          select
            Culture_Plan_ID,
            Sum(Current_Quantity) as Current_Quantity
          from
            culture_plan_moved_area
          group by
            Culture_Plan_ID) f on
          f.Culture_Plan_ID = cp.Culture_Plan_ID) a
      where
        Aggregate_Current_Quantity > 0`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  static findById(Id, result) {
    connection.query(
      "SELECT * FROM culture_plan WHERE Culture_Plan_ID = ?",
      [Id],
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }

  static findByIdPromise = (Id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM culture_plan WHERE Culture_Plan_ID = ? LIMIT 1",
        [Id],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res[0]);
          }
        }
      );
    });
  };

  static findAllOnTransition = () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select *
        from (select Culture_Plan_ID, Area, BatchID
              from culture_plan
              where Transition_Time <= CURRENT_DATE and Current_Quantity > 0
              union
              select cp.Culture_Plan_ID, Area_Name as Area, cp.BatchID as BatchID
              from culture_plan_moved_area ma
                       left join culture_plan cp on cp.Culture_Plan_ID = ma.Culture_Plan_ID
              where ma.Transition_Time <= CURRENT_DATE AND ma.Current_Quantity > 0) b`,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  };

  static updateCulturePlanCurrentQuantity = (
    Id,
    { Current_Quantity, Transition_Time }
  ) => {
    return new Promise((resolve, reject) => {
      const updated = {
        Current_Quantity,
      };
      if (Transition_Time) {
        updated.Transition_Time = Transition_Time;
      }

      connection.query(
        "UPDATE culture_plan SET ? WHERE Culture_Plan_ID = ?",
        [updated, Id],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  };

  static createCulturePlan(culturePlan, result) {
    connection.query(
      "INSERT INTO culture_plan SET ?",
      culturePlan,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }

  static updateCulturePlan(culturePlan, result) {
    const updateQuery = `UPDATE culture_plan SET Area = ?, Plant_Type = ?, Container_Type = ?, Created_Date = ?, Transition_Time = ?, Task_ID = ? ,Status = ?, Initial_Quantity = ?, Current_Quantity = ?, Remaining_Days = ? WHERE Culture_Plan_ID = ?`;
    const updateData = [
      culturePlan.Area,
      culturePlan.Plant_Type,
      // culturePlan.Container_Quantity,
      culturePlan.Container_Type,
      culturePlan.Created_Date,
      culturePlan.Transition_Time,
      culturePlan.BatchID,
      culturePlan.Task_ID,
      culturePlan.Status,
      culturePlan.Initial_Quantity,
      culturePlan.Current_Quantity,
      culturePlan.Remaining_Days,
      culturePlan.Culture_Plan_ID,
    ];
    console.log(updateData);
    console.log(updateQuery);
    connection.query(updateQuery, updateData, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }

  static deleteCulturePlan(Id, result) {
    const deleteQuery = "DELETE FROM culture_plan WHERE Culture_Plan_ID = ?";

    connection.query(deleteQuery, Id, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  }
}

module.exports = CulturePlan;
