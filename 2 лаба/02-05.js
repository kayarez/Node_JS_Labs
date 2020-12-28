var http = require('http');

var fs   = require('fs');

http.createServer(
    function(request, response) {
        if (request.url == '/fetch') {
            let html = fs.readFileSync('./fetch.html');
            response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            response.end(html);
        }
        else response.end("Resourse not found!");
    }
).listen(5000, function(){
    console.log("Server started at 5000");});