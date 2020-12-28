var http = require('http');

http.createServer(
    function(request, response) {
        if (request.url == '/api/name') {
            response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': 'http://localhost:5000'});
            response.write('Kerez Katya');
            response.end();
        }
        else response.end("Resourse not found!");
    }
).listen(3000, function(){
    console.log("Server started at 3000");});