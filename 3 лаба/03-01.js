var http = require('http');
let state = 'norm';
http.createServer(
    function(request, response) {
        response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        
        response.end(`<h1>${state}</h1>`);
    }
).listen(5000);

process.stdin.setEncoding('utf-8');
process.stdout.write(state+'->')
process.stdin.on('readable', ()=> {
    
    let chunk = null;
    while((chunk = process.stdin.read()) != null) {
        
        if (chunk.split('\r')[0] == 'exit') process.exit(0);
        else if (chunk.split('\r')[0] == 'norm') state = 'norm'; 
        else if (chunk.split('\r')[0] == 'stop') state = 'stop'; 
        else if (chunk.split('\r')[0] == 'test') state = 'test'; 
        else if (chunk.split('\r')[0] == 'idle') state = 'idle'; 
        else  process.stdout.write(chunk);
        process.stdout.write(state+'->')
    }
});