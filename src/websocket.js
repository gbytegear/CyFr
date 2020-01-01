const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const messageProcessing = (socket, data, request) => {

}

const disconnectProcessing = socket => {
    peers.splice(peers.indexOf(socket), 1);

}

module.exports = async (socket, request) => {
    // (require('./clients'))
    socket.on('message', data => messageProcessing(socket, data, request));
    socket.on('disconnect', () => disconnectProcessing(socket))
}