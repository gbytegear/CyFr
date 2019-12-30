const url = require('url');
const path = require('path');
const fs = require('fs');

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
    let request_path = server_settings.dir + url.parse(request.url, true).pathname;
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

const responseOfPostRequest = (request, response, data) => {
    data = JSON.parse(data);
    
}

module.exports = (request, response, post_data) => {
    if(request.method == "GET") return responseOfGetRequest(request, response);
    if(request.method == "POST") return responseOfGetRequest(request, response, post_data);
}