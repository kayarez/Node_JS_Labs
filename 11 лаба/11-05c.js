const async = require('async')
const rpcWSS = require('rpc-websockets').Client
let ws = new rpcWSS('ws://localhost:5000')

let sq3 =0, sq54 =0, mul35 =0, mul24 =0, mulfib =0
let h = () => async.waterfall([
    (cb) => {ws.call('mul', [2,4,6]).catch(e => cb(e, null)).then( r => {cb(null, r)})},
    (p, cb) => {
        mul24 = p; 
        ws.login({ login: 'admin', password: 'admin' })
                      .then(login => {
                        ws.call('fib', [7]).catch((e) => cb(e, null)).then((r) => { cb(null, r[6]) });
                })},
    (p, cb) => {ws.call('mul', [mul24, p]).catch(e => cb(e, null)).then( r => {cb(null, r)})},
    (p, cb) => {mulfib =p; ws.call('square', [3]).catch(e => cb(e, null)).then( r => {cb(null, r)})},
    (p, cb) => {sq3 = p; ws.call('square', [5,4]).catch(e => cb(e, null)).then( r => {cb(null, r)})},
    (p, cb) => {sq54 =p; ws.call('mul', [3,5,7,9,11,13]).catch(e => cb(e, null)).then( r => {cb(null, r)})},
    (p, cb) => {mul35 =p; ws.call('sum', [sq3, sq54, p]).catch(e => cb(e, null)).then( r => {cb(null, r)})},
    (p, cb) => {ws.call('sum', [p, mulfib]).catch(e => cb(e, null)).then( r => {cb(null, r)})}
],
    (e, r) => {
        if (e) console.log('error = ', e);
        else console.log('result = ', r);
        ws.close();
})
ws.on('open', h)