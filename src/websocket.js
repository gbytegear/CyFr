const client = require('./clients');
const p2p = require('./p2p');
const gets = require('./clients/data');


const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const messageProcessing = async (socket, data, request) => {
  data = JSON.parse(data);
  switch (data.action) {
    case "session":
    delete data.action;
    return client.session(socket, data);

    case "login":
    delete data.action;
    return client.login(socket, data);

    case "register":
    delete data.action;
    return client.register(socket, data);

    case "logout":
    delete data.action;
    return client.logout(socket, data);

    case "getData":
    delete data.action;
    return (client.isLogined(data.uid)) ? gets(socket, data) : socket.send('{"action":"error","error":1,"error_str":"Client isn\' logined!"}');

    case "offerSend":
    delete data.action;
    return p2p.sendOffer(socket, data);

    case "offerAnswer":
    delete data.action;
    return p2p.answerOffer(data);
  }
}

const disconnectProcessing = async socket => {

}

module.exports = async (socket, request) => {
    client.connect(socket);
    socket.on('message', data => messageProcessing(socket, data, request));
    socket.on('disconnect', () => disconnectProcessing(socket))
}
