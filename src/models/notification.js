const { getSocketByUsername } = require("./connection");
const { dbConnection } = require("./culturePlanMove");

class Notification {

    static fetchUnreadNotifications(username) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM notifications WHERE Assigned_To = ? AND Is_Read = 0', [username], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    static markAsRead(notificationIds) {
        return new Promise((resolve, reject) => {
            dbConnection.query('UPDATE notifications SET Is_Read = 1 WHERE Notification_ID IN (?)', [notificationIds], (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            });
        })
    }

    static createNotification(notification) {
        return new Promise((resolve, reject) => {
            dbConnection.query('INSERT INTO notifications SET ?', notification, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.affectedRows)
                }
            });
        })
    }

    static async notifyCulturePlan(culturePlan, receivers) {
        const { BatchID, Area } = culturePlan
        for (const receiver of receivers) {
            const socket = getSocketByUsername(receiver)
            let msg = JSON.stringify({
                notificationType: 'info',
                message: `Crop ${BatchID} on area ${Area} is on transition time!`
            })
            let Is_Read = 0
            if (socket) {
                Is_Read = 1
                socket.send(msg)
                continue
            } else {
                await Notification.createNotification({
                    Task_ID: 0,
                    Assigned_To: receiver,
                    Message: msg,
                    Is_Read,
                })
                continue;
            }
        }

}

    static async notifyTaskStatus(task, receivers) {
    const { Status, Title, Task_ID } = task
    for (const receiver of receivers) {
        const socket = getSocketByUsername(receiver)
        let msg = ''
        switch (Status) {
            case 'Completed':
                msg = JSON.stringify({
                    notificationType: 'info',
                    message: `Task ${Title} has been completed`
                })
                break;
            case 'Incomplete':
                msg = JSON.stringify({
                    notificationType: 'info',
                    message: `New task has been assigned to you: ${Title}`
                })
                break;
        }
        let Is_Read = 0
        if (socket) {
            Is_Read = 1
            socket.send(msg)
            continue
        } else {
            await Notification.createNotification({
                Task_ID,
                Assigned_To: receiver,
                Message: msg,
                Is_Read,
            })
            continue
        }
    }



}
}

module.exports = Notification