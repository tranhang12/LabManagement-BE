const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TranHang.143',
    database: 'lab_management_db'
});

module.exports = dbConnection;