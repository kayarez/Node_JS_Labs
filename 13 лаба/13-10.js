const udp = require('dgram');
const buffer = require('buffer');
const PORT = 2000;
const client = udp.createSocket('udp4');
client.on('message',(msg, info)=> {
    console.log(msg.toString());
});
let data = Buffer.from('Hello');
client.send(data, PORT,'localhost',(err)=>{
    if(err) client.close();
});