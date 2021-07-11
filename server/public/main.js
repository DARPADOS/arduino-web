const socket = io();

socket.on('temp', function(data){
    console.log('tempreatura',data);
    let temp = document.getElementById('temperature');
    temp.innerHTML = `${data} °C`;
});

socket.on('PH', function(data){
    console.log('ph',data);
    let temp = document.getElementById('ph-level');
    temp.innerHTML = `${data}`;
});

//PROMESAS
/*
const waitArduinoResponse = new Promise((resolve, reject) =>{
    socket.on('Motor', function(data){
        console.log('Motor',data);
        resolve(data);
    });
})*/

// Motor Control
var setTarget = document.querySelector("[data-onoff]");
var result = document.getElementById('result');
var select = document.getElementById('select');

setTarget.addEventListener("change", function(){
    if (this.checked) {
        
        if(select.selectedIndex == 0){
            socket.emit('motor-on-off', 'Motor:1')
        }
        else{
            if(select.selectedIndex == 1){
                socket.emit('motor-on-off', 'Motor:2')
            }
        }
        result.innerHTML= 'Encendido';
    }
    else{
        socket.emit('motor-on-off', 'Motor:OFF')
        result.innerHTML= 'Apagado';
    }
});

select.addEventListener("change", function(){
    if (setTarget.checked) {
        
        if(select.selectedIndex == 0){
            socket.emit('motor-on-off', 'Motor:1')
        }
        else{
            if(select.selectedIndex == 1){
                socket.emit('motor-on-off', 'Motor:2')
            }
        }
    }
});