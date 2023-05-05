const dbConnection = require('../config/dbConnection');

const getRecordCount = (tableName) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(`SELECT COUNT(*) as count FROM ${tableName}`, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results[0].count);
    });
  });
};

module.exports = { getRecordCount };
