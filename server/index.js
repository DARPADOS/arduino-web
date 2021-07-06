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

const port = new Serialport('COM1',{
    baudRate: 9600,
});

const parser = port.pipe(new Readline({ delimiter:'\r\n' }));

parser.on('open', function () {
    console.log('connection is opened');
});

parser.on('data', function (data){
    console.log(data)
    datos = data.split(':');
    if(datos[0] == 'PH'){
        io.emit('PH', datos[1]);
    }
    else{
        if(datos[0] == 'Temperatura'){
            io.emit('temp', datos[1]);
        }
    }
})

port.on('error', function(err) {
    console.log(err);
});
