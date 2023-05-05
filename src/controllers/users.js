const createToken = require('../helper/jwtMiddleware').sign;
const jwtMiddleware = require('../helper/jwtMiddleware');
const User = require('../models/users');
const encryption = require('../helper/encryption');
const jwt = require('jsonwebtoken');
const connection = require('../config/dbConnection');
const secret = process.env.JWT_SECRET_KEY;

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
        const { User_Name, User_Password, Full_Name, email, Phone_Number, Is_Admin } = req.body;

        const userExists = await new Promise((resolve) => {
            User.findByUsername(User_Name, (err, user) => {
                if (user) {
                    res.status(409).send({
                        status: false,
                        message: 'Username already exists in the system'
                    });
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });

        if (!userExists) {
            const encryptedPassword = encryption.encrypt(User_Password);

            const newUser = new User({ User_Name, User_Password: encryptedPassword, Full_Name, email, Phone_Number, Is_Admin: Is_Admin || false });

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
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error creating user:' + error.message
        });
    }
};


exports.login = (req, res) => {
    try {
        const user = req.body;
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

exports.resetPassword = (req, res) => {
    const userId = req.user.id;

    const {oldPassword, newPassword } = req.body;
  
    const passwordValidation = (password) => {
      // Đặt các yêu cầu hợp lệ cho mật khẩu tại đây
      const minLength = 6;
      return password.length >= minLength;
    };
  
    if (!passwordValidation(newPassword)) {
      res.status(400).send({
        status: false,
        message: 'New password does not meet the requirements',
      });
      return;
    }
    connection.query('SELECT * FROM Users WHERE User_ID = ?', [userId], async (error, rows) => {
        if (error) {
          res.status(500).send({
            status: false,
            message: 'Error retrieving user from database:' + error.message,
          });
          return;
        }
    
        const user = rows[0];
    
        if (!user) {
          res.status(404).send({
            status: false,
            message: 'User not found',
          });
          return;
        }
    
        if (!oldPassword) {
          res.status(400).send({
            status: false,
            message: "Old password is required",
          });
          return;
        }
    
        if (!user.User_Password) {
          res.status(500).send({
            status: false,
            message: "Error: user password is missing in the database",
          });
          return;
        }
    
        const isPasswordValid = await encryption.compare(oldPassword.toString(), user.User_Password);
        if (!isPasswordValid) {
          res.status(401).send({
            status: false,
            message: 'Invalid old password',
          });
          return;
        }
    
        const encryptedPassword = encryption.encrypt(newPassword);
    
        connection.query('UPDATE Users SET User_Password = ? WHERE User_ID = ?', [encryptedPassword, userId], (err) => {
          if (err) {
            res.status(500).send({
              status: false,
              message: 'Error resetting password in database:' + err.message,
            });
            return;
          }
    
          res.status(200).send({
            status: true,
            message: 'Password reset successfully',
          });
        });
      });
    };


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
        const { User_Name, Full_Name, Phone_Number, Is_Admin, User_Password, email } = req.body;

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
                User_Name: User_Name,
                Full_Name: Full_Name,
                Phone_Number: Phone_Number,
                Is_Admin: Is_Admin,
                email: email,
                User_Password: User_Password ? encryption.encrypt(User_Password) : user.User_Password
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

  exports.getCurrentUser = (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).send({
                status: false,
                message: 'No token provided'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secret);

        User.findById(decoded.id, (err, user) => {
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
                user: {
                    id: user.User_ID,
                    username: user.User_Name,
                    fullName: user.Full_Name,
                    phoneNumber: user.Phone_Number,
                    email: user.email,
                    isAdmin: user.Is_Admin
                }
            });
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in retrieving current user:' + error.message
        });
    }
};

