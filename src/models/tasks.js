const connection = require('../config/dbConnection');

class Tasks {
    constructor(tasks) {
        this.Task_Category = tasks.Task_Category;
        this.Title = tasks.Title;
        this.Description = tasks.Description;
        this.Priority = tasks.Priority;
        this.Due_Date = tasks.Due_Date;
        this.Status = tasks.Status;
        this.Assigned_To = tasks.Assigned_To;
    }

    static findAll(result) {
        connection.query(`SELECT Tasks.*, Culture_Plan.BatchID
        FROM Tasks 
        INNER JOIN Culture_Plan 
        ON Tasks.Culture_Plan_ID = Culture_Plan.Culture_Plan_ID`, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    static findAllPromise({
        assigneeName,
        Culture_Plan_ID,
        Status = 'Incomplete',
        Priority,
    }) {
        return new Promise((resolve, reject) => {

            let queryString = `SELECT tasks.*, culture_plan.BatchID
            FROM tasks 
            INNER JOIN culture_plan 
            ON tasks.Culture_Plan_ID = culture_plan.Culture_Plan_ID`
            const params = []
            const whereStatement = []
            if (assigneeName) {
                whereStatement.push(`Assigned_To = ?`)
                params.push(assigneeName)
            }
            if (Culture_Plan_ID) {
                whereStatement.push(`tasks.Culture_Plan_ID = ?`)
                params.push(Culture_Plan_ID)
            }
            if (Status) {
                whereStatement.push(`tasks.Status = ?`)
                params.push(Status)
            }
            if (Priority) {
                whereStatement.push(`tasks.Priority = ?`)
                params.push(Priority)
            }

            if (whereStatement.length > 0) {
                queryString = queryString + ` WHERE ` + whereStatement.join(' AND ')
            }
            connection.query(queryString, params, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    static findById(Id, result) {
        connection.query('SELECT * FROM tasks WHERE Task_ID = ?', [Id], (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    static findByIdPromise(Id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tasks WHERE Task_ID = ? LIMIT 1', [Id], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res?.at(0) || null)
                }
            });
        })
    }

    static createTask(task, result) {

        connection.query('INSERT INTO tasks SET ?', task, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static createTaskPromise(task) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tasks SET ?', task, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    static updateTask(task, result) {
        const updateData = [task.Task_Category, task.Title, task.Description, task.Priority, task.Due_Date, task.Status, task.Assigned_To, task.Task_ID];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
    static buildNewTaskNotification = (task) => {
        return {
            notificationType: 'info',
            message: `New task has been assigned to you: ${task.Title}`,
        }
    }
    static updateTaskStatusPromise(taskId, status) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE tasks SET Status = ? WHERE Task_ID = ?`, [status, taskId], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    static deleteTask(Id, result) {
        const deleteQuery = 'DELETE FROM tasks WHERE Task_ID = ?'

        connection.query(deleteQuery, Id, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }
}

module.exports = Tasks;