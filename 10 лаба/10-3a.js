var webSock = require('ws')

let parm0 = process.argv[0] // нод
let parm1 = process.argv[1] // приложениe
let parm2 = process.argv[2] // первый параметр

console.log(parm0)
console.log(parm1)
console.log(parm2)

let pref = typeof parm2 == 'undefined'? 'A': parm2
const ws = new webSock('ws://localhost:5000/broadcast')

ws.on('open', () => {
    let k = 0
    setInterval(() => {ws.send(`client: ${pref}-${++k}`)}, 3000)
    setTimeout(() => {ws.close()}, 25000)
})
ws.on('message', (mes) => {
    console.log(`message from server: ${mes}`)
})
ws.on('close', () => {
    console.log('socket closed')
})