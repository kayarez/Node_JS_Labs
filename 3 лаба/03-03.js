var http = require('http');
var fs = require('fs');

http.createServer(
    function(request, response) {
        let file = fs.readFileSync('./03-03.html')
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        response.end(file);
    }
).listen(3000);