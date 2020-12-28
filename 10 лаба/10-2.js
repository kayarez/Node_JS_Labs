var webSock = require('ws')

const ws = new webSock('ws://localhost:4000/wsserver')

let n = 0
ws.on('open', () => {
    console.log('socket open')
    setInterval(() => { ws.send(`10-01-client:${++n}`)}, 3000)
    setTimeout(() => {ws.close()}, 25000)
})
ws.on('message', (mes) => {
    console.log(`Received message => ${mes}`)
})
ws.onclose = (e) => {
    console.log('socket onclose')
}