var http = require('http');
const url = require('url');

function fact(n) {
    if (n == 0) {
      return 1;
    } else {
      return n * fact(n - 1);
    }
  }

function Fact(n, callback) {
    this.FN = n;
    this.FFact = fact;
    this.fcallback = callback;
    this.calc = () => {
        process.nextTick( () => {this.fcallback(null, this.FFact(this.FN));});
    }
}


http.createServer(
    function(request, response) {
        if(url.parse(request.url, true).query['k'] != undefined) {
            k = parseInt(url.parse(request.url, true).query['k'])
            
            let factik = new Fact(k, (err, result) => {
                jobj = {'k': k, 'fact': result}
                response.writeHead(200, {'Content-Type': 'application/json; text/plain','Access-Control-Allow-Origin': 'http://localhost:3000'})
                response.end(JSON.stringify(jobj))
            })
            factik.calc()
        }
        
    }
).listen(5000);