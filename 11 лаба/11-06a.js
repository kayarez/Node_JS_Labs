const rpcWSC = WebSocket = require('rpc-websockets').Client;
let wsA = new rpcWSC('ws://localhost:4000');

//Подпис на А, сообщ о нем выводом в консоль
wsA.on('open',()=>{
    wsA.subscribe('A');
    wsA.on('A',()=>
    {
        console.log('Event A');
    });
});


