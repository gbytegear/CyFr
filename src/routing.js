const url = require('url');
const path = require('path');
global.fs = require('fs');
const clients = require('./clients');

const content_type = {
    '': 'text/html;charset=utf-8',
    '.html': 'text/html;charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    
    //IMAGES
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/pjpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',

    //FONTS
    '.ttf': 'font/ttf',
};

const responseOfGetRequest = (request, response) => {
    let request_path = server_settings.public + url.parse(request.url, true).pathname;
    var response_type = content_type[path.extname(request_path)];
    request_path += (path.extname(request_path) == '')? 'index.html' : '';


    fs.readFile(request_path, function (err, content) {
        if(err) {
            response.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
            return response.end("404 Not Found!");
        }
        response.writeHead(200, {
            'Content-Type': response_type,
            "Content-Length": content.length,
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive"
        });
        response.end(content);
    });
}

const responseOfPostRequest = async (request, response, data) => {
    data = JSON.parse(data);
    const response_data = new Object;
    for(let property in data)
        switch (property) {
            case "file":
                response_data.file = fs.readFileSync(data.file);
            break;
            case "register": return clients.register(response);
            case "auth": return clients.auth(response, data.auth);
    }
    response.end(JSON.stringify(response_data));
}

module.exports = (request, response, post_data) => {
    if(request.method == "GET") return responseOfGetRequest(request, response);
    if(request.method == "POST") return responseOfPostRequest(request, response, post_data);
}