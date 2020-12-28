const async = require('async')
const rpcWSS = require('rpc-websockets').Client
let ws = new rpcWSS('ws://localhost:5000')

let h = (x=ws) => async.parallel({
    square_3:       cb => { ws.call('square', [3]).catch((e) => cb(e, null)).then((r) => { cb(null, r) }); },
    square_5_4:     cb => { ws.call('square', [5, 4]).catch((e) => cb(e, null)).then((r) => { cb(null, r) }); },
    sum_2:          cb => { ws.call('sum', [2]).catch((e) => cb(e, null)).then((r) => { cb(null, r) }); },
    sum_2_4_6_8_10: cb => { ws.call('sum', [2, 4, 6, 8, 10]).catch((e) => cb(e, null)).then((r) => { cb(null, r) }); },
    mul_3:          cb => { ws.call('mul', [3]).catch((e) => cb(e, null)).then((r) => { cb(null, r) }); },
    mul_3_5_7_8_11: cb => { ws.call('mul', [3, 5, 7, 9, 11, 13]).catch((e) => cb(e, null)).then((r) => { cb(null, r) }); },
    fib_7:          cb => {
                    ws.login({ login: 'admin', password: 'admin' })
                      .then(login => {
                    
                        ws.call('fib', [7]).catch((e) => cb(e, null)).then((r) => { cb(null, r) });
                    
                })
    },
    fact_10: cb => {
                ws.login({ login: 'admin', password: 'admin' })
                    .then(login => {
                        
                            ws.call('fact', [10]).catch((e) => cb(e, null)).then((r) => { cb(null, r) });
                        
                            
                        
                    })
    }
},
    (e, r) => {
        if (e) console.log('error = ', e);
        else console.log('result = ', r);
        ws.close();
})

ws.on('open', h)