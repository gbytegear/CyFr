global.fs = require('fs');
global.server_settings = require('./settings.json');
const routing = require('./src/routing'),
      wsProcessing = require('./src/websocket');
global.server = new (require('http')).Server((request, response) => {
    let post_data = new String;
    response.setHeader('Content-Type', 'application/json');
    request.on('data', data => {
        post_data += data;
    });

    request.on('end', data => {
        routing(request, response, post_data);
    });
});

global.ws = new (require('ws').Server)({ server: global.server });

global.ws.on('connection', (socket, request) => wsProcessing(socket, request));

server.listen(server_settings.port);
// console.clear();
console.log(`Server listen on: http://${server_settings.host}:${server_settings.port}`);
