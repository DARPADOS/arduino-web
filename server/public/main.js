const socket = io();

// TEMPERATURA
let temp = document.getElementById('temperature');
let tempdiv = document.getElementById('temp-div');
let tempvalid =document.getElementById('temp-valid');

var tempLI = 36.5;
var tempLS = 37.5;

socket.on('temp', function(data){
    console.log('tempreatura',data);

    temp.innerHTML = `${data} °C`;

    dataTemp = parseFloat(data);

    if(dataTemp > tempLI && dataTemp < tempLS){
        tempdiv.classList.remove('alerta');
        tempdiv.classList.add('optimo');
        tempvalid.innerHTML  = 'Optimo';
    }else {
        tempdiv.classList.remove('optimo');
        tempdiv.classList.add('alerta');
        tempvalid.innerHTML  = 'Alerta';
    }
});

// NIVEL DE PH

let ph = document.getElementById('ph-level');
let phdiv = document.getElementById('ph-div');
let phvalid = document.getElementById('ph-valid');

var phLI = 7.5;
var phLS = 8.5;

socket.on('PH', function(data){
    console.log('ph',data);
    
    ph.innerHTML = `${data}`;

    if(dataTemp > phLI && dataTemp < phLS){
        phdiv.classList.remove('alerta');
        phdiv.classList.add('optimo');
        phvalid.innerHTML  = 'Optimo';
    }else {
        phdiv.classList.remove('optimo');
        phdiv.classList.add('alerta');
        phvalid.innerHTML  = 'Alerta';
    }
});


// Tabla de condiciones
var bac1cond = `<tr>
<th scope="row">Temperatura (°C)</th>
<td class="table-danger">36.5</td>
<td class="table-success">37</td>
<td class="table-danger">37.5</td>
</tr>
<tr>
<th scope="row">Nivel de PH</th>
<td class="table-danger">6.50</td>
<td class="table-success">7.00</td>
<td class="table-danger">7.50</td>
</tr>
<tr>
<th scope="row">Agitación (RPM)</th>
<td class="table-success" colspan="3">100</td>
</tr>`;

var bac2cond = `<tr>
<th scope="row">Temperatura (°C)</th>
<td class="table-danger">30</td>
<td class="table-success">31</td>
<td class="table-danger">32</td>
</tr>
<tr>
<th scope="row">Nivel de PH</th>
<td class="table-danger">7.50</td>
<td class="table-success">8.00</td>
<td class="table-danger">8.50</td>
</tr>
<tr>
<th scope="row">Agitación (RPM)</th>
<td class="table-success" colspan="3">150</td>
</tr>`;

// Motor Control
var setTarget = document.querySelector("[data-onoff]");
var motorEstate = document.getElementById('result');
var select = document.getElementById('select');
var conds = document.getElementById('condiciones');
var motordiv = document.getElementById('motor-div');

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
        motordiv.classList.remove('alerta');
        motordiv.classList.add('optimo');
        motorEstate.innerHTML= 'Encendido';
    }
    else{
        socket.emit('motor-on-off', 'Motor:OFF')
        motordiv.classList.remove('optimo');
        motordiv.classList.add('alerta');
        motorEstate.innerHTML= 'Apagado';
    }
});

select.addEventListener("change", function(){

    if(select.selectedIndex == 0){
        conds.innerHTML = bac1cond;

        tempLI = 36.5;
        tempLS = 37.5;

        phLI = 6.5;
        phLi = 7.5;

        if (setTarget.checked){
            socket.emit('motor-on-off', 'Motor:1');
        }
    }
    else{
        if(select.selectedIndex == 1){
            conds.innerHTML = bac2cond;

            tempLI = 30;
            tempLS = 32;

            phLI = 7.5;
            phLi = 8.5;

            if(setTarget.checked){
                socket.emit('motor-on-off', 'Motor:2')
            }
        }
    }
});