var http = require("http");
var fs = require("fs");
var mailer= require("./06-02").customSend;
var server = http.createServer(function (request, response) {
    if (request.method === "GET") {
        response.write(
            fs.readFileSync(
                "D:\\3 КУРС\\5 СЕМЕСТР\\NODE.JS\\Лабы\\6 лаба\\index.html"
            )
        );
        response.end();
        return;
    } else {

        response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        request.on("data", function (chunk) {
            let data= JSON.parse(chunk);
            mailer(data.from,data.to,data.pass,data.text)
        });
        response.end();
    }
}
).listen(5000);