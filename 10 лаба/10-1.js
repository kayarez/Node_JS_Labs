var http = require('http')
var fs = require('fs')
var webSock = require('ws')

const httpserver = http.createServer((req, res) => {
    if(req.method == 'GET' && req.url == '/start') {
        res.writeHead(200, {'Content-Type': 'text.html; charset=utf-8'})
        res.end(fs.readFileSync('./10-1.html'))
    } else {
        res.writeHead(400)
        res.end('URL is not correct')
    }
}).listen(3000)


let k = 0
const wsserver = new webSock.Server({port: 4000, host: 'localhost', path: '/wsserver'})
wsserver.on('connection', (ws) => {
    let ns = ''
    let n = 0
    ws.on('message', mes => {
        console.log(`client message: ${mes}`)
        ns = mes.split(':')[1]
        n = parseInt(ns)
    })
    setInterval(() => {ws.send(`<br/>10-01-server: ${n} -> ${++k}</span>`)}, 5000)
})