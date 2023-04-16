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
        connection.query('SELECT * FROM tasks', (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        });
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

    static createTask(task, result) {

        connection.query('INSERT INTO tasks SET ?', task, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
    }

    static updateTask(task, result) {
        const updateQuery = 'UPDATE tasks SET Task_Category = ?, Title = ?, Description = ?, Priority = ?, Due_Date = ?, Status = ?, Assigned_To = ? WHERE Task_ID = ?';
        const updateData = [task.Task_Category, task.Title, task.Description, task.Priority, task.Due_Date, task.Status, task.Assigned_To, task.Task_ID];

        connection.query(updateQuery, updateData, (err, res) => {
            if (err) {
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        });
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