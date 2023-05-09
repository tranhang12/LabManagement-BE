const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "TranHang.143",
    database: process.env.DATABASE_NAME || 'lab_management_db'
});

module.exports = dbConnection;
