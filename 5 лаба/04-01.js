let http = require("http");
let fs = require("fs");
let url = require("url");
let Bd = require("./Bd").Bd;
let bd = new Bd();
let start = new Date();
let requests = 0;
let end;

bd.on("GET", (request, response) => {
    if (url.parse(request.url).pathname === "/index") {
        response.write(
            fs.readFileSync(
                "D:\\3 КУРС\\5 СЕМЕСТР\\NODE.JS\\Лабы\\5 лаба\\index.html"
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
let commits = 0;

bd.on("COMMIT", (param) => {
    commits++;
    end = new Date();
    console.log(start + ' ' + end + ' ' + requests + ' ' + commits);
});
var server = http
    .createServer(function (request, response) {
        response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        requests++;
        bd.emit(request.method, request, response);
    })
    .listen(5000)
    .on("listening", () => {

        console.log("server start at 5000");
    });
let timer_sd;
let timer_sc;
let timer_ss;
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {

        while ((chunk = process.stdin.read()) != null) {
            let array = chunk.trim().split(' ', 2);
            let num = Number.parseInt(array[1]);
            switch (array[0].toLowerCase()) {
                case 'sd': {
                    if (isNaN(num)) {
                        clearTimeout(timer_sd);
                        continue;
                    }
                    console.log("server ends in " + num + " seconds");
                    timer_sd = setTimeout(() => {
                        process.exit(1);
                    }, num * 1000);
                }
                    break;
                case 'sc': {
                    console.log(" in sc ");
                    if (isNaN(num)) {
                        clearInterval(timer_sc);
                        continue;
                    }
                    timer_sc = setInterval(() => {
                        bd.emit("COMMIT");
                    }, num * 1000).unref();

                    console.log("sc commit");
                }
                    break;
                case 'ss': {
                    console.log(" in ss");
                    if (!isNaN(num)) {
                    clearTimeout(timer_ss);
                    }
                    let startCommits = commits;
                    let startRequests = requests;
                    timer_ss = setTimeout(() => {
                        console.log("during the time " + num +
                            " happens: " + (commits - startCommits) + " commits," + (requests - startRequests)  + " requests.")
                    }, num * 1000);
                    break;
                }
            }
        }
    }
)
console.log(module.exports);
module.exports.server = server;