exports.getAreasWithCulturePlan = (req, res) => {
    const query = `
      SELECT DISTINCT a.*
      FROM area a
      JOIN culture_plan cp ON a.Area_Name = cp.Area;
    `;
    dbConnection.query(query, (err, results) => {
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
  