const connection = require('../config/dbConnection');

class User {
    constructor(user) {
        this.User_Name = user.userName;
        this.User_Password = user.password;
        this.Full_Name = user.fullName;
        this.Phone_Number = user.phoneNumber;
        this.Email = user.email;
        this.Is_Admin = user.isAdmin;
    }

    static signUp(user, result) {
        connection.query('INSERT INTO users SET ?', user, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static findByUsername(username, result) {
        connection.query('SELECT * FROM users WHERE User_Name = ?', [username], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }

    static updateUser(user, result) {
        const updateQuery = 'UPDATE users SET Full_Name = ?, Phone_Number = ?, Is_Admin = ? WHERE User_Name = ?';
        const updateData = [user.Full_Name, user.Phone_Number, user.Is_Admin, user.User_Name];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static resetPassword(user, result) {
        const resetQuery = 'UPDATE users SET User_Password = ? WHERE User_Name = ?';
        const resetData = [user.User_Password, user.User_Name];

        connection.query(resetQuery, resetData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static deleteUser(user, result) {
        const deleteQuery = 'DELETE FROM users WHERE User_Name = ?';
        const deleteData = user.User_Name;

        connection.query(deleteQuery, deleteData, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
}



module.exports = User;