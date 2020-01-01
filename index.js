const routing = require('./src/routing');
global.server_settings = require('./settings.json');

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

global.ws.on('connection', (socket, request) => require('./src/websocket')(socket, request));

server.listen(server_settings.port);
console.log(`Server listen on: http://${server_settings.host}:${server_settings.port}`);