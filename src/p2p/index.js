const wiating_clients = new Array;

module.exports = {
  
  sendOffer(socket, data) {
    data.from = guid();
    wiating_clients[data.from] = socket;
    data.action = "p2p_connection_request";
    for(let user in users.sessions)
      if(users.sessions[user].nickname == data.to)
        users.sessions[user].socket.send(JSON.stringify(data));
  }

  answerOffer(data) {
    let wiating_client = wiating_client[data.from];
    delete wiating_client[data.from];
    delete data.from;
    data.action = "p2p_connection_answer";
    wiating_client.send(JSON.stringify(data));
  }

}
