const udp = require('dgram');
const PORT = 2000;
let server = udp.createSocket('udp4');
server.on('message',(msg, info)=>{
    console.log(msg.toString());
    server.send('ECHO: ' + msg, info.port, info.address,(err)=>{if(err){server.close();}})
});
server.bind(PORT);