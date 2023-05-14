const _socketStore = new Map()
const reverseSocketStore = new Map()

exports.saveSocket = (username, socket) => {
    _socketStore.set(username, socket)
    reverseSocketStore.set(socket, username)
}

exports.removeSocketByUsername = (username) => {
    const socket = _socketStore.get(username)
    _socketStore.delete(username)
    reverseSocketStore.delete(socket)
}


exports.removeSocketBySocket = (socket) => {
    const username = reverseSocketStore.get(socket)
    _socketStore.delete(username)
    reverseSocketStore.delete(socket)
}

exports.getSocketByUsername = (username) => {
    const ret = _socketStore.get(username)
    if (ret) {
        return ret
    }
    return null
}
