const dataType = {
    "TEMP": (dato) => console.log('temp', dato),
    "PH": (dato) => console.log('phLevel', dato),
    "SPEED": (dato) => console.log('speed', dato)
};

const data = ['TEMP: 24','PH: 7','SPEED: 35']



data.forEach(element => {
    try {
        cadena = element.split(': ');
        dataType[cadena[0]](cadena[1]);
    } catch (error) {
        console.log(error)
    }
});


