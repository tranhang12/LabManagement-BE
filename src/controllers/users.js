const createToken = require('../helper/jwtMiddleware').sign;
const jwtMiddleware = require('../helper/jwtMiddleware');
const User = require('../models/users');
const encryption = require('../helper/encryption');

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
                    res.status(409).send({
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
                message: 'Sign up successful'
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

exports.createUser = async (req, res) => {
    try {
        const { userName, password, fullName, email, phoneNumber, isAdmin } = req.body;

        const existingUser = await User.findByUsername(userName);

        if (existingUser) {
            return res.status(409).send({
                status: false,
                message: 'Username already exists in the system'
            });
        }

        const encryptedPassword = encryption.encrypt(password);

        const newUser = new User({ userName, password: encryptedPassword, fullName, email, phoneNumber, isAdmin: isAdmin || false });

        User.signUp(newUser, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error in login info:' + err.message
                });
            } else {
                res.status(201).send({
                    status: true,
                    message: 'User created successfully',
                    user: newUser
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error creating user:' + error.message
        });
    }
};


exports.login = (req, res) => {
    try {
        const user = req.body; //req.body;
        const username = user.userName;
        const password = user.password;

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
                // const accessToken = createToken(user);
                const accessToken = createToken({ id: user.User_ID, username: user.User_Name, isAdmin: user.Is_Admin });

                res.status(200).send({
                    status: true,
                    message: 'Login successful',
                    user: user,
                    accessToken: accessToken
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
exports.getUser = (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send({
                status: false,
                message: 'Error retrieving user from database:' + err.message
            });
            return;
        }

        if (!user) {
            res.status(404).send({
                status: false,
                message: 'User not found'
            });
            return;
        }

        res.status(200).send({
            status: true,
            message: 'User retrieved successfully',
            user: user
        });
    });
};

// exports.updateUser = (req, res) => {
//     try {
//         const user = req.body;
//         const username = user.name;
//         const password = user.pass;

//         User.findByUsername(username, (err, user) => {
//             if (err) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Error retrieving user from database:' + err.message
//                 });
//                 return;
//             }

//             if (!user) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Invalid username or password'
//                 });
//                 return;
//             }

//             const result = encryption.compare(password, user.User_Password);
//             if (result === true) {
//                 if (!user.Is_Admin) {
//                     res.status(401).send({
//                         status: false,
//                         message: 'Unauthorized to update user'
//                     });
//                     return;
//                 }

//                 const updateUser = new User(req.body);

//                 User.updateUser(updateUser, (err, result) => {
//                     if (err) {
//                         res.status(500).send({
//                             status: false,
//                             message: 'Error updating user in database:' + err.message
//                         });
//                         return;
//                     }

//                     else if (result < 1) {
//                         res.status(500).send({
//                             status: false,
//                             message: 'Error updating user in database'
//                         });
//                         return;
//                     }

//                     res.status(200).send({
//                         status: true,
//                         message: 'User updated successfully'
//                     });
//                 });
//             }
//             else {
//                 res.status(401).send({
//                     status: false,
//                     message: 'Unauthorized to update user.'
//                 });
//                 return;
//             }
//         });
//     } catch (error) {
//         res.status(500).send({
//             status: false,
//             message: 'Error in updating user info:' + error.message
//         });
//     }
// }

// exports.resetPassword = (req, res) => {
//     try {
//         const user = req.body;
//         const username = user.name;
//         const password = user.pass;

//         User.findByUsername(username, (err, user) => {
//             if (err) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Error retrieving user from database:' + err.message
//                 });
//                 return;
//             }

//             if (!user) {
//                 res.status(500).send({
//                     status: false,
//                     message: 'Invalid username or password'
//                 });
//                 return;
//             }

//             const result = encryption.compare(password, user.User_Password);
//             if (result === true) {
//                 if (!user.Is_Admin) {
//                     res.status(401).send({
//                         status: false,
//                         message: 'Unauthorized to reset password'
//                     });
//                     return;
//                 }

//                 req.body.password = encryption.encrypt(req.body.password);

//                 const resetUserPassword = new User(req.body);

//                 User.resetPassword(resetUserPassword, (err, result) => {
//                     if (err) {
//                         res.status(500).send({
//                             status: false,
//                             message: 'Error resetting password in database'
//                         });
//                         return;
//                     }

//                     else if (result < 1) {
//                         res.status(500).send({
//                             status: false,
//                             message: 'Error resetting password in database'
//                         });
//                         return;
//                     }

//                     res.status(200).send({
//                         status: true,
//                         message: 'Password reset successfully'
//                     });
//                 });
//             }
//             else {
//                 res.status(401).send({
//                     status: false,
//                     message: 'Unauthorized to reset password.'
//                 });
//                 return;
//             }
//         });
//     }
//     catch (error) {
//         res.status(500).send({
//             status: false,
//             message: 'Error in reseting  user password' + error.message
//         });
//     }
// }

exports.deleteUser = (req, res) => {
    try {
        const userId = req.params.id;

        User.findById(userId, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database:' + err.message
                });
                return;
            }

            if (!user) {
                res.status(404).send({
                    status: false,
                    message: 'User not found'
                });
                return;
            }

            User.deleteUserById(userId, (err, result) => {
                if (err) {
                    res.status(500).send({
                        status: false,
                        message: 'Error deleting user in database:' + err.message
                    });
                    return;
                }

                if (result < 1) {
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
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in deleting' + error.message
        });
    }
}


exports.updateUserInfo = (req, res) => {
    try {
        const { id } = req.params;
        const { userName, fullName, phoneNumber, isAdmin, password, email } = req.body;

        User.findById(id, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database:' + err.message
                });
                return;
            }

            if (!user) {
                res.status(404).send({
                    status: false,
                    message: 'User not found'
                });
                return;
            }

            const updatedUser = {
                User_Name: userName,
                Full_Name: fullName,
                Phone_Number: phoneNumber,
                Is_Admin: isAdmin,
                email: email,
                User_Password: password ? encryption.encrypt(password) : user.User_Password
            };

            User.updateUserById(id, updatedUser, (err, result) => {
                if (err) {
                    res.status(500).send({
                        status: false,
                        message: 'Error updating user in database:' + err.message
                    });
                    return;
                }

                if (result < 1) {
                    res.status(500).send({
                        status: false,
                        message: 'Error updating user in database'
                    });
                    return;
                }

                res.status(200).send({
                    status: true,
                    message: 'User info updated successfully'
                });
            });
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in updating user info:' + error.message
        });
    }
}

exports.getAllUsers = (req, res) => {
    User.getAll((err, users) => {
      if (err) {
        res.status(500).send({
          status: false,
          message: 'Error retrieving users from database: ' + err.message
        });
      } else {
        res.status(200).send({
          status: true,
          message: 'Users retrieved successfully',
          users: users
        });
      }
    });
  };
    
