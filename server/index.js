const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, function() {
    console.log('server listening on port ', 3000);
});

// SERIAL COMUNICATION
const Serialport = require('serialport');
const Readline = Serialport.parsers.Readline;

const port = new Serialport('COM4',{
    baudRate: 9600,
});

const parser = port.pipe(new Readline({ delimiter:'\r\n' }));

parser.on('open', function () {
    console.log('connection is opened');
});

parser.on('data', function (data){
    console.log(data)
    datos = data.split(':');
    switch (datos[0]) {
        case 'PH':
            io.emit('PH', datos[1]);
            break;
        case 'Temperatura':
            io.emit('temp', datos[1]);
            break;
        case 'Motor':
            io.emit('Motor', datos[1]);
            break;
        default:
            break;
    }
})

port.on('error', function(err) {
    console.log(err);
});

// SEND DATA AT SERIAL PORT
io.on('connection', (socket)=>{
    socket.on('motor-on-off', (msg) => {
        port.write(msg+'\n');
    })
})
