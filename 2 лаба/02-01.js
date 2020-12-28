var http = require('http');
var url  = require('url');
var fs   = require('fs');

http.createServer(
    function(request, response) {
        if (request.url == '/index') {
            let html = fs.readFileSync('./index.html');
            response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            response.end(html);
        }
        else response.end("Resourse not found!");
    }
).listen(5000, function(){
    console.log("Server started at 5000");});