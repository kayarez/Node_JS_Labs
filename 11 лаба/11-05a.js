const rpcWSS = require('rpc-websockets').Client
let ws = new rpcWSS('ws://localhost:5000')

ws.on('open', () => {
    ws.call('square', [3]).then((rc) => {console.log('square(3)=', rc)})
    ws.call('square', [5,4]).then((rc) => {console.log('square(5,4)=', rc)})
    ws.call('sum', [2]).then((rc) => {console.log('sum(2)=', rc)})
    ws.call('sum', [2,4,6,8,10]).then((rc) => {console.log('sum(2,4,6,8,10)=', rc)})
    ws.call('mul', [3]).then((rc) => {console.log('mul(3)=', rc)})
    ws.call('mul', [3,5,7,9,11,13]).then((rc) => {console.log('mul(3,5,7,9,11,13)=', rc)})

    ws.login({login: 'admin', password: 'admin'})
    .then((login) => {
        ws.call('fib', [1]).then((rc) => {console.log('fib(1)=', rc)})
        ws.call('fib', [2]).then((rc) => {console.log('fib(2)=', rc)})
        ws.call('fib', [7]).then((rc) => {console.log('fib(7)=', rc)})
        ws.call('fact', [0]).then((rc) => {console.log('fact(0)=', rc)})
        ws.call('fact', [5]).then((rc) => {console.log('fact(5)=', rc)})
        ws.call('fact', [10]).then((rc) => {console.log('fact(10)=', rc)})
})

})