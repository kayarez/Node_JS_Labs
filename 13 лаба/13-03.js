const net = require('net');

let HOST = '0.0.0.0';
let PORT = 40000;
let sum = 0;
let server = net.createServer();
let timerId = null;

server.on('connection',(sock) => {
    sock.on('data', (data) => {
        console.log('Server data:', data, sum);
        sum += data.readInt32LE();
    });

    let buf = Buffer.alloc(4);

    timerId = setInterval(() => {
        buf.writeInt32LE(sum,0);
        sock.write(buf)
    },5000);

    sock.on('close', ()=>{
        console.log('Server CLOSED');
        clearInterval(timerId);
    });

    sock.on('error', ()=>{
        console.log('Server ERROR');
    });
});

server.listen(PORT, HOST);
