var http = require('http');
var fs   = require('fs');

http.createServer(
    function(request, response) {
        if (request.url == '/png') {
            let png = fs.readFileSync('./pic.png');
            response.writeHead(200, {'Content-Type':'image/png; charset=utf-8'});
            response.end(png, 'binary');
        }
        else response.end("Resourse not found!");
    }
).listen(5000, function(){
    console.log("Server started at 5000");});