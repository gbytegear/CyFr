
const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const register = (response) => {
    return fs.readFile(server_settings.clients + "/clients.json", 'utf-8', function (err, content) {
        if(err) return console.error('clients.json isn\'t founded!');
        const clients = JSON.parse(content);

        let uid = guid();
        while(clients.hasOwnProperty(uid)) uid = guid();
        clients[uid] = Date.now() + 15000;
        fs.writeFileSync(server_settings.clients + "/clients.json", JSON.stringify(clients, null, 4));
        response.end(`{"uid":"${uid}"}`);
    });
}

const auth = (response, uid) => {
    return fs.readFile(server_settings.clients + "/clients.json", 'utf-8', function (err, content) {
        if(err) return console.error('clients.json isn\'t founded!');
        const clients = JSON.parse(content);
        const response_data = new Object;

        if (!clients.hasOwnProperty(uid)) {
            uid = guid();
            response_data.registered = true;
        }

        clients[uid] = Date.now() + 15000;
        fs.writeFileSync(server_settings.clients + "/clients.json", JSON.stringify(clients, null, 4));
        response_data.uid = uid;
        response.end(JSON.stringify(response_data));
    });
}

setInterval(()=>{
    return fs.readFile(server_settings.clients + "/clients.json", 'utf-8', function (err, content) {
        if(err) return console.error('clients.json isn\'t founded!');
        const clients = JSON.parse(content);
        for(let uid in clients) {
            if(clients[uid] < Date.now()) {
                delete clients[uid];
            }
        }
        fs.writeFileSync(server_settings.clients + "/clients.json", JSON.stringify(clients, null, 4));
    });
},10000);

module.exports = {register, auth};