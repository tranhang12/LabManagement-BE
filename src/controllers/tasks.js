
const Tasks = require('../models/tasks');
const User = require('../models/users');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');

exports.getAllTasks = (req, res) => {
    try {
        Tasks.findAll((err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving tasks data from database: ' + err.message
                });
                return;
            }
            if (result != undefined) {

                res.status(200).send({
                    status: true,
                    message: 'Success',
                    result: result
                });
            } else {
                res.status(500).send({
                    status: false,
                    message: 'Something went wrong'
                });
                return;
            }
        });

    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in getting data from Database: ' + error.message
        });
    }
};

exports.getTask = (req, res) => {
    try {
        let { Id } = req.params;

        Tasks.findById(Id, (err, result) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving task data from database: ' + err.message
                });
                return;
            }
            if (result != undefined) {
                let response = {
                    status: true,
                    message: 'Success',
                    result: result
                }

                res.status(200).send(response);

            } else {
                res.status(500).send({
                    status: false,
                    message: 'Something went wrong'
                });
                return;
            }
        });

    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in getting data from Database: ' + error.message
        });
    }
};

exports.addTask = async (req, res) => {
    try {

        const {
            Culture_Plan_ID,
            Task_Category,
            Title,
            Description,
            Priority,
            Due_Date,
            Status = "Incomplete",
            Assigned_To
        } = req.body

        await Tasks.createTaskPromise({
            Culture_Plan_ID,
            Task_Category,
            Title,
            Description,
            Priority,
            Due_Date,
            Status,
            Assigned_To
        })
        
        return res.status(200).send({
            status: true,
            message: 'Task created successfully'
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            message: 'Error in creating task in database: ' + error.message
        });
    }
}

exports.updateTask = (req, res) => {
    try {
        const user = auth(req);

        if (user == undefined) {
            res.status(401).send({
                status: false,
                message: 'Unauthorized to update task'
            });
            return;
        }

        const username = user.name;
        const password = user.pass;

        User.findByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database: ' + err.message
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
                        message: 'Unauthorized to update task'
                    });
                    return;
                }
                
                let task = new Tasks(req.body);
                task.Task_ID = req.params.Id;

                if (req.body.Status == undefined || req.body.Status == "") {
                    task.Status = "Incomplete";
                }

                Tasks.updateTask(task, (err, result) => {
                    if (err) {
                        if (err.code.includes("ER_NO_REFERENCED_ROW")) {
                            res.status(500).send({
                                status: false,
                                message: 'Assigned To user does not exist'
                            });
                        }
                        else {
                            res.status(500).send({
                                status: false,
                                message: 'Error in updating task in database: ' + err.message
                            });
                        }
                        return;
                    }

                    else if (result < 1) {
                        console.log(result)
                        res.status(500).send({
                            status: false,
                            message: 'Error in updating task in database'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'Record updated successfully'
                    });
                });
            }
            else {
                res.status(401).send({
                    status: false,
                    message: 'Unauthorized to update task'
                });
                return;
            }
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'Error in updating task in database. Record may not exist: ' + error.message
        });
    }
}

exports.deleteTask = (req, res) => {
    try {
        const user = auth(req);

        if (user == undefined) {
            res.status(401).send({
                status: false,
                message: 'Unauthorized to delete task'
            });
            return;
        }

        const username = user.name;
        const password = user.pass;

        User.findByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send({
                    status: false,
                    message: 'Error retrieving user from database: ' + err.message
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
                        message: 'Unauthorized to delete task'
                    });
                    return;
                }

                const Id = req.params.Id;

                Tasks.deleteTask(Id, (err, result) => {
                    if (err) {
                        res.status(500).send({
                            status: false,
                            message: 'Error deleting task in database: ' + err.message
                        });
                        return;
                    }
                    
                    else if (result < 1) {
                        res.status(200).send({
                            status: false,
                            message: 'Task does not exist with this id'
                        });
                        return;
                    }

                    res.status(200).send({
                        status: true,
                        message: 'Task deleted successfully.'
                    });
                });  
            }
            else {
                res.status(401).send({
                    status: false,
                    message: 'Unauthorized to delete task'
                });
                return;
            }
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: 'An error occurred while deleting your record: ' + error.message
        });
    }
        
};




