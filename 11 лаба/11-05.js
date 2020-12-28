const rpcWSS = require('rpc-websockets').Server

let server = new rpcWSS({port:5000, host:'localhost'})

server.setAuth(
    credentials => credentials.login == 'admin' && credentials.password == 'admin'
)

server.register('square', square).public()
server.register('sum', sum).public()
server.register('mul', mul).public()
server.register('fib', fib).protected()
server.register('fact', fact).protected()

function square(args) {
    if (args.length === 1) {
        return Math.PI * args[0] * args[0];
    } else if (args.length === 2) {
        return args[0] * args[1];
    } else {
        return 0;
    }
}
function sum(args) {
    let rc =0
    for(i=0; i< args.length; i++) {
        rc += args[i]
    }
    return rc
}
function mul(args) {
    let rc =1
    for(i=0; i< args.length; i++) {
        rc *= args[i]
    }
    return rc
}
function fib(n) {
    let elems = [];
    for (let i = 1; i <= n; i++) {
        elems.push(fibn(i));
    }
    return elems;
}

function fibn(n) {
    return n < 2 ? n : fibn(n - 1) + fibn(n - 2);
}

function fact(n) {
    return n == 0 ? 1 : n * fact(n - 1);
}