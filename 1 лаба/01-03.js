const http = require("http");


http.createServer(function(request,response){
    let b = '';
    request.on('data', str=>{b+=str; console.log('data', b);})
    response.end("<h1>Hello World</h1>" + '<br>' + "Uri " + request.url + '<br>'
     + "Method" + request.method + '<br>' + "Headers" + request.headers + '<br>' + "HttpVersion" + request.httpVersion);

     
}).listen(3000, "127.0.0.1",function(){
    console.log("Server running at http://localhost:3000/");
});