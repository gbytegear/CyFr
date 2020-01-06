const js_sha3 = require('js-sha3');

const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

let clients = JSON.parse(global.fs.readFileSync(server_settings.clients, 'utf8'));
let client_lock = false;
const sessions = {};

//Public access
global.users = {

};
Object.defineProperties(global.users, {
  clients: {
    get: () => clients
  },
  sessions: {
    get: () => sessions
  },
  getClientSettingsProperty: (nickname, property) => clients[nickname].settings[property],
  setClientSettingsProperty: async (nickname, property, value) => {
    if(clients[nickname].settings[property] == value) return;
    while(client_lock); //LOCK WAITING!
    client_lock = true; //LOCK ON!
    clients[nickname].settings[property] = value;
    client_lock = false; //LOCK OFF!
  }
});

const connect = socket => {
  socket.send('{"action":"connect"}');
}

const session = (socket, data) => {
  if(!data.new)if(sessions.hasOwnProperty(data.uid))
    return sessions[data.uid].hasOwnProperty("nickname") ? (
        sessions[data.uid].socket = socket,
        socket.send(`{"action":"setState","logined":true,"nickname":"${sessions[data.uid].nickname}","settings":${JSON.stringify(sessions[data.uid].settings)}}`)
      ) : ( //else
        sessions[data.uid] = {socket, salt: guid()},
        socket.send(`{"action":"setState","logined":false,"nickname":null,"settings":null,"salt":"${sessions[data.uid].salt}"}`)
      );
  let uid = guid();
  while(sessions.hasOwnProperty(uid)) uid = guid();
  sessions[uid] = {socket, salt: guid()};
  return socket.send(`{"action":"setUID","uid":"${uid}","salt":"${sessions[uid].salt}"}`);
}

const disconnect = socket => {

}

const register = (socket, data) => {
  while(client_lock); //LOCK WAITING!
  client_lock = true; //LOCK ON!
  const client_storage = JSON.parse(global.fs.readFileSync(server_settings.clients, 'utf8'));
  client_storage[data.nickname] = {
    pswdhash: data.pswdhash,
    settings: {}
  };
  clients = client_storage;
  fs.writeFileSync(server_settings.clients, JSON.stringify(client_storage), "utf8");
  client_lock = false; //LOCK OFF!
  sessions[data.uid] = {
    nickname: data.nickname,
    settings: clients[data.nickname].settings
  };
  return socket.send(`{"action":"setState","logined":true,"nickname":"${sessions[data.uid].nickname}","settings":${JSON.stringify(sessions[data.uid].settings)}}`);
}

const login = (socket, data) => {
  if(!clients.hasOwnProperty(data.nickname)){
    let client_storage = JSON.parse(global.fs.readFileSync(server_settings.clients, 'utf8'));
    if(client_storage.hasOwnProperty(data.nickname)) {
      while(client_lock); //LOCK WAITING!
      client_lock = true; //LOCK ON!
      clients = client_storage;
      client_lock = false; //LOCK OFF!
    } else {
      sessions[data.uid].salt = guid();
      return socket.send(`{"action":"login_err","err_str":"Incorrect login or password!","salt":"${sessions[data.uid].salt}"}`);
    }
  }
  if(js_sha3.keccak512(clients[data.nickname].pswdhash + sessions[data.uid].salt) === data.pswdhash){
    sessions[data.uid] = {
      nickname: data.nickname,
      settings: clients[data.nickname].settings
    }
    return socket.send(`{"action":"setState","logined":true,"nickname":"${sessions[data.uid].nickname}","settings":${JSON.stringify(sessions[data.uid].settings)}}`);
  }
  sessions[data.uid].salt = guid();
  return socket.send(`{"action":"login_err","err_str":"Incorrect login or password!","salt":"${sessions[data.uid].salt}"}`);
}

const logout = (socket, data) => {
  if(!sessions.hasOwnProperty(data.uid))return session(socket, data);
  sessions[data.uid] = {socket, salt: guid()};
  return socket.send(`{"action":"setState","logined":false,"nickname":null,"settings":null,"salt":"${sessions[data.uid].salt}"}`);
}

const isLogined = uid => {
  if(!sessions.hasOwnProperty(uid))return false;
  if(!sessions[uid].hasOwnProperty('nickname')) return false;
  return true;
}

module.exports = {
  connect,
  session,
  register,
  login,
  logout,
  isLogined
};
