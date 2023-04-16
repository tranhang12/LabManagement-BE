const User = require('../models/users');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');

exports.signup = (req, res) => {
    try {
        if (req.body.password == null || req.body.password == undefined || req.body.password.length < 5) {
            res.status(500).send({
                status: false,
                message: 'Invalid password'
            });
            return;
        }

        req.body.password = encryption.encrypt(req.body.password);

        const newUser = new User(req.body);

        User.signUp(newUser, (err, result) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    res.status(500).send({
                        status: false,
                        message: 'Username already exists in the system'
                    });
                }
                else if (err.code == 'ER_BAD_NULL_ERROR') {
                    let columnName = err.sqlMessage.split("'");
                    res.status(500).send({
                        status: false,
                        message: 'Column \'' + columnName[1] + '\' cannot be empty'
                    });
                }
                else {
                    res.status(500).send({
                        status: false,
                        message: 'Error inserting user in database'
                    });
                }
                return;
            }

            else if (result < 1) {
                res.status(500).send({
                    status: false,
                    message: 'Error inserting user in database'
                });
                return;
            }

            res.status(200).send({
                status: true,
                message: 'Signup successful'
            });
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in login info:' + error.message
        });
    }
}

exports.login = (req, res) => {
    try {
        const user = auth(req);
        const username = user.name;
        const password = user.pass;

        User.findByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database:' + err.message
                });
                return;
            }

            if (!user) {
                res.status(401).send({
                    status: false,
                    message: 'Invalid username or password'
                });
                return;
            }

            const result = encryption.compare(password, user.User_Password);
            if (result === true) {
                user.User_Password = undefined;
                delete user.User_Password;

                res.status(200).send({
                    status: true,
                    message: 'Login successful',
                    user: user
                });
            } else {
                res.status(401).send({
                    status: false,
                    message: 'Invalid username or password'
                });
                return;
            }
        });

    } catch (error) {
        res.status(401).send({
            status: false,
            message: 'Invalid username or password:' + error.message
        });
    }
};

exports.updateUserInfo = (req, res) => {
    try {
        const user = auth(req);
        const username = user.name;
        const password = user.pass;

        User.findByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database:' + err.message
                });
                return;
            }

            if (!user) {
                res.status(500).send({
                    status: false,
                    message: 'Invalid username or password'
                });
                return;
            }

            const result = encryption.compare(password, user.User_Password);
            if (result === true) {
                if (!user.Is_Admin) {
                    res.status(401).send({
                        status: false,
                        message: 'Unauthorized to update user'
                    });
                    return;
                }

                const updateUser = new User(req.body);

                User.updateUser(updateUser, (err, result) => {
                    if (err) {
                        res.status(500).send({
                            status: false,
                            message: 'Error updating user in database:' + err.message
                        });
                        return;
                    }

                    else if (result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error updating user in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'User updated successfully'
                    });
                });
            }
            else {
                res.status(401).send({
                    status: false,
                    message: 'Unauthorized to update user.'
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in updating user info:' + error.message
        });
    }
}

exports.resetPassword = (req, res) => {
    try {
        const user = auth(req);
        const username = user.name;
        const password = user.pass;

        User.findByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database:' + err.message
                });
                return;
            }

            if (!user) {
                res.status(500).send({
                    status: false,
                    message: 'Invalid username or password'
                });
                return;
            }

            const result = encryption.compare(password, user.User_Password);
            if (result === true) {
                if (!user.Is_Admin) {
                    res.status(401).send({
                        status: false,
                        message: 'Unauthorized to reset password'
                    });
                    return;
                }

                req.body.password = encryption.encrypt(req.body.password);

                const resetUserPassword = new User(req.body);

                User.resetPassword(resetUserPassword, (err, result) => {
                    if (err) {
                        res.status(500).send({
                            status: false,
                            message: 'Error resetting password in database'
                        });
                        return;
                    }

                    else if (result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error resetting password in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'Password reset successfully'
                    });
                });
            }
            else {
                res.status(401).send({
                    status: false,
                    message: 'Unauthorized to reset password.'
                });
                return;
            }
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in reseting  user password' + error.message
        });
    }
}

exports.deleteUser = (req, res) => {
    try {
        const user = auth(req);
        const username = user.name;
        const password = user.pass;

        User.findByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database:' + err.message
                });
                return;
            }

            if (!user) {
                res.status(500).send({
                    status: false,
                    message: 'Invalid username or password'
                });
                return;
            }

            const result = encryption.compare(password, user.User_Password);
            if (result === true) {
                if (!user.Is_Admin) {
                    res.status(401).send({
                        status: false,
                        message: 'Unauthorized to delete user.'
                    });
                    return;
                }

                const deleteUser = new User(req.body);

                User.deleteUser(deleteUser, (err, result) => {
                    if (err) {
                        if (err.code.includes("ER_ROW_IS_REFERENCED")) {
                            res.status(500).send({
                                status: false,
                                message: 'Unable to delete user. Task is assigned to ' + deleteUser.User_Name
                            });
                        }
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting user in database'
                        });
                        return;
                    }

                    else if (result < 1) {
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting user in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'User deleted successfully.'
                    });
                });
            }
            else {
                res.status(401).send({
                    status: false,
                    message: 'Unauthorized to delete user.'
                });
                return;
            }
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in deleting' + error.message
        });
    }
}

