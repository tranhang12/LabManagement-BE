const jwt = require('jsonwebtoken');
const Notification = require('../models/notification');
const { saveSocket, removeSocketBySocket } = require('../models/connection');

exports.handleSocket = (socket) => {
    console.log("socket")
    socket.on('error', console.log)
    socket.on('close', () => {
        removeSocketBySocket(socket)
    })
    socket.on('message', async (message) => {
        try {
            const ret = await handleWSMessage(message)
            if (ret.msgType === 'auth') {
                saveSocket(ret.username, socket)

                Notification.fetchUnreadNotifications(ret.username).then(async (notifications) => {
                    if (notifications.length > 0) {
                        notifications.forEach(notification => socket.send(notification.Message))
                        await Notification.markAsRead(notifications.map(task => task.Notification_ID))
                    }
                }).catch(console.log)

            }
        } catch (err) {
            console.log(err)
            removeSocketBySocket(socket)
            socket.close()
        }
    })
}



const jwtVerify = (accessToken) => new Promise((resolve, reject) => {
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            reject(err)
        } else {
            resolve(decoded)
        }
    })
})

const handleWSAuth = async ({accessToken}) => {
    const decoded = await jwtVerify(accessToken)
    return {
        msgType: 'auth',
        status: 'success',
        username: decoded.username,
    }

}
const handleWSMessage = (message) => {
    const jsonMessage = JSON.parse(Buffer.from(message).toString('utf-8'))
    console.log(jsonMessage)
    switch (jsonMessage.msgType) {
        case 'auth':
            return handleWSAuth(jsonMessage)
        default:
            break;
    }
}
