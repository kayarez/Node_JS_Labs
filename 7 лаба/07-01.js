const http = require("http");
const url = require("url");
const fs = require("fs");
const stat = require("./m07-01")("./static");

var get_handler = (req, res) => {
    if (url.parse(req.url).pathname === "/") {
        let html = fs.readFileSync("./index.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
    } else {
        if (stat.isStatic('html', req.url)) stat.sendFile(req, res, { "Content-Type": "text/html; charset=utf-8;" });
        else if (stat.isStatic('css', req.url)) stat.sendFile(req, res, { "Content-Type": "text/css; charset=utf-8;" });
        else if (stat.isStatic('js', req.url)) stat.sendFile(req, res, { "Content-Type": "text/javascript; charset=utf-8;" });
        else if (stat.isStatic('docx', req.url)) stat.sendFile(req, res, { "Content-Type": "application/msword" });
        else if (stat.isStatic('png', req.url)) stat.sendFile(req, res, { "Content-Type": "image/png" });
        else if (stat.isStatic('json', req.url)) stat.sendFile(req, res, { "Content-Type": "application/json; charset=utf-8;" });
        else if (stat.isStatic('xml', req.url)) stat.sendFile(req, res, { "Content-Type": "application/xml; charset=utf-8;" });
        else if (stat.isStatic('mp4', req.url)) stat.sendFile(req, res, { "Content-Type": "video/mp4" });
        else {
            res.statusCode = 404;
            res.statusMessage = "Resourse not found";
            res.end("Resourse not found");
        }
    } 
}

var request_handler = (request, response) => {
    switch(request.method) {
        case 'GET': get_handler(request, response); break;
        default: {
            response.writeHead(405, { "Content-Type": "application/json; charset=utf-8" });
            response.end(`{"error":"${request.method}: ${request.url}, HTTP status 405"}`);
        }
    }
} 

http.createServer(request_handler).listen(3000)