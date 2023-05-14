
const Tasks = require('../models/tasks');
const User = require('../models/users');
const encryption = require('../helper/encryption');
const auth = require('basic-auth');
const { socketStore } = require('./notification');
const Notification = require('../models/notification');

exports.getAllTasks = async (req, res) => {
    try {
        const { user } = req
        const { Culture_Plan_ID, Status, Priority } = req.query
        let assigneeName = ''
        if (!user.isAdmin) {
            assigneeName = user.username
        }
        const tasks = await Tasks.findAllPromise({
            assigneeName,
            Culture_Plan_ID: +Culture_Plan_ID,
            Status,
            Priority,
        })
        res.status(200).send({
            status: true,
            message: 'Success',
            result: tasks
        });
    } catch (error) {
        console.log(error)
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

        const result = await Tasks.createTaskPromise({
            Culture_Plan_ID,
            Task_Category,
            Title,
            Description,
            Priority,
            Due_Date,
            Status,
            Assigned_To,
        })

        Notification.notifyTaskStatus({
            Task_ID: result.insertId,
            Status,
            Title,
        }, [Assigned_To]).catch(console.log)

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

exports.updateTask = async (req, res) => {
    try {

        const { user } = req
        const { Id } = req.params
        const { Status } = req.body
        const task = await Tasks.findByIdPromise(+Id)
        if (!task) {
            return res.status(400).send({
                status: false,
                message: 'Task not found'
            })
        }
        if (task.Assigned_To !== user.username && !user.isAdmin) {
            return res.status(401).send({
                status: false,
                message: 'Operation not permitted'
            })
        }
        if (!["Completed", "Incomplete".includes(Status)]) {
            return res.status(400).send({
                status: false,
                message: 'Invalid task status'
            })
        }
        await Tasks.updateTaskStatusPromise(task.Task_ID, Status)

        const admins = await User.findAllAdmin()
        if (admins.length > 0) {
            await Notification.notifyTaskStatus({
                ...task,
                Status,
            }, admins.map(e => e.User_Name))
        }

        return res.status(200).send({
            status: true,
            message: 'Task updated successfully'
        })

    }
    catch (error) {
        console.log(error)
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




