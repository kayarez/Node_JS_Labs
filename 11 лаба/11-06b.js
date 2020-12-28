const rpcWSC = WebSocket = require('rpc-websockets').Client;
let wsA = new rpcWSC('ws://localhost:4000');



let wsB = new rpcWSC('ws://localhost:4000');
wsB.on('open',()=>{
    wsB.subscribe('B');
    wsB.on('B',()=>
    {
        console.log('Event B');
    });
});

