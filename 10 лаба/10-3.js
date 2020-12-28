var webSock = require('ws')

const wss = new webSock.Server({port: 5000, host:'localhost', path:'/broadcast'})

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log(`message : ${data}`)
        wss.clients.forEach((client) => {
            if(client.readyState === webSock.OPEN) client.send('broadcast responce: '+data)
        })
    })
})