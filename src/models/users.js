const connection = require('../config/dbConnection');

class User {
    constructor(user) {
        this.User_Name = user.User_Name;
        this.User_Password = user.User_Password;
        this.Full_Name = user.Full_Name;
        this.Phone_Number = user.Phone_Number;
        this.Email = user.email;
        this.Is_Admin = user.Is_Admin;
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

    static findByUsername(User_Name, result) {
        connection.query('SELECT * FROM users WHERE User_Name = ?', [User_Name], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }

    // static async findByUsername(username) {
    //     try {
    //       const rows = await connection.query('SELECT * FROM users WHERE User_Name = ?', [username]);
    //       return rows[0];
    //     } catch (error) {
    //       console.log('error: ', error);
    //       throw error;
    //     }
    //   }


    static findById(id, result) {
        connection.query('SELECT * FROM users WHERE User_ID = ?', [id], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    }

    static findByIdPromise(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE User_ID = ? LIMIT 1', [id], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }


    // static updateUser(user, result) {
    //     const updateQuery = 'UPDATE users SET Full_Name = ?, Phone_Number = ?, Is_Admin = ? WHERE User_Name = ?';
    //     const updateData = [user.Full_Name, user.Phone_Number, user.Is_Admin, user.User_Name];

    //     connection.query(updateQuery, updateData, (err, res) => {
    //         if (err) {
    //             console.log('error: ', err);
    //             result(err, null);
    //         } else {
    //             result(null, res.affectedRows);
    //         }
    //     });
    // }

    // static resetPassword(user, result) {
    //     const resetQuery = 'UPDATE users SET User_Password = ? WHERE User_Name = ?';
    //     const resetData = [user.User_Password, user.User_Name];

    //     connection.query(resetQuery, resetData, (err, res) => {
    //         if (err) {
    //             console.log('error: ', err);
    //             result(err, null);
    //         } else {
    //             result(null, res.affectedRows);
    //         }
    //     });
    // }

    static updateUserById(id, updatedUser, result) {
        let updateQuery = 'UPDATE users SET ';
        let updateData = [];
        for (const property in updatedUser) {

            if (updatedUser[property] !== null && updatedUser[property] !== undefined) {
                updateQuery += `${property} = ?, `;
                updateData.push(updatedUser[property]);
            }
        }

        updateQuery = updateQuery.slice(0, -2);
        updateQuery += ' WHERE User_ID = ?';
        updateData.push(id);

        connection.query(updateQuery, updateData, (err, res) => {
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

    static deleteUserById(userId, callback) {
        const deleteQuery = 'DELETE FROM users WHERE User_ID = ?';
        const deleteData = [userId];

        connection.query(deleteQuery, deleteData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.affectedRows);
            }
        });
    }


    static getAll = (callback) => {
        const query = 'SELECT * FROM users';

        connection.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    };

}

module.exports = User;