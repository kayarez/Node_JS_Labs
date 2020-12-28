var http = require("http");
var fs = require("fs");
var url = require("url");
var Bd = require("./Bd");
var bd = new Bd();
bd.on("GET", (request, response) => {
  if (url.parse(request.url).pathname === "/index") {
    response.write(
      fs.readFileSync(
        "D:\\3 КУРС\\5 СЕМЕСТР\\NODE.JS\\Лабы\\4 лаба\\index.html"
      )
    );
    response.end();
    return;
  }

  response.write(JSON.stringify(bd.getAll()));
  response.end();
});
bd.on("POST", (request, response) => {
  request.on("data", function (chunk) {
    bd.post(JSON.parse(chunk));
    console.log(JSON.parse(chunk));
  });
  response.end();
});
bd.on("PUT", (request, response) => {

    request.on("data", function (chunk) {
      bd.put(JSON.parse(chunk));
    });
    response.end();
  
});
bd.on("DELETE", (request, response) => {
  if (request.method === "DELETE") {
    request.on("data", function (chunk) {
      bd.delete(JSON.parse(chunk));
    });
    response.end();
  }
});
var server = http
.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  bd.emit(request.method,request,response);
})
.listen(5000)
.on("listening", () => {
  console.log("server start at 5000");
  
});

module.exports.bd=bd;
module.exports.server=server;