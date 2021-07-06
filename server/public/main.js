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