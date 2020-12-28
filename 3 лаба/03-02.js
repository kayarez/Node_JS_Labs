var http = require('http');
const url = require('url');

function fact(n) {
    if (n == 0) {
      return 1;
    } else {
      return n * fact(n - 1);
    }
  }


http.createServer(
    function(request, response) {
        if(url.parse(request.url, true).query['k'] != undefined) {
            k = parseInt(url.parse(request.url, true).query['k'])
            fac = fact(k)
            jobj = {'k': k, 'fact': fac}
            response.writeHead(200, {'Content-Type': 'application/json; text/plain','Access-Control-Allow-Origin': 'http://localhost:3000'})
            response.end(JSON.stringify(jobj))
        }
        
    }
).listen(5000);