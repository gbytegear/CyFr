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

server.listen(server_settings.port, server_settings.host);
console.log(`Server listen on: http://${server_settings.host}:${server_settings.port}`);