$(document).ready(function (e) {
    fetch('/educacion-financiera/assets/json/diccionario.json')
        .then(async function (res) { return await res.json(); })
        .then(function (res) {
            extraePalabras(res);
        }).catch(function (err) {
            console.error(err);
        });
});

const extraePalabras = (res) => {
    /* Código para mostrar siempre el menú */
    let menu = res['menu'];
    let todasPalabras = [];
    let diccionario = [];
    let selector;
    let palabraEscogida

    menu.forEach(element => {

        todasPalabras = element.contenido;
        todasPalabras.forEach(e => {
            diccionario.push(e)
        });
    });

    selector = obtenFecha();

    if (selector > diccionario.length) {
        let dia = new Date();
        let numDia = dia.getDate();
        palabraEscogida = diccionario[numDia];

    } else {
        palabraEscogida = diccionario[selector-1];
    }

    $('#palabraDia').append(palabraEscogida.palabra);
    $('#significadoPalabra').append(palabraEscogida.significado);
}

const obtenFecha = () => {
    let dia = new Date();
    let fecha = String(dia.getDate()).padStart(2, '0') + '/' + String(dia.getMonth() + 1).padStart(2, '0') + '/' + dia.getFullYear();
    let numDia = dia.getDate();
    let mes = (dia.getMonth() + 1);
    let anio = dia.getFullYear();
    let tipoAnio = bisiesto(anio);
    let indice;

    indice = obtenIndiceDia(numDia, mes, tipoAnio)

    return indice;
}

const bisiesto = (year) => {
    return (year % 400 === 0) ? true : (year % 100 === 0) ? false : year % 4 === 0;
}

const obtenIndiceDia = (dia, mes, tipoAnio) => {

    let sumaDias;

    if (tipoAnio) {
        let feb = 29
        sumaDias = evaluaPorAnio(dia, mes, feb)
    } else {
        let feb = 28
        sumaDias = evaluaPorAnio(dia, mes, feb)
    }


    return sumaDias;

}

const evaluaPorAnio = (dia, mes, feb) => {

    let indice = 0;

    let calendario = {
        enero: 31,
        febrero: feb,
        marzo: 31,
        abril: 30,
        mayo: 31,
        junio: 30,
        julio: 31,
        agosto: 31,
        septiembre: 30,
        octubre: 31,
        noviembre: 30,
        diciembre: 31

    }

    switch (mes) {
        case 1:
            indice = dia;
            break;
        case 2:
            indice = dia + calendario.enero;
            break;
        case 3:
            indice = dia + calendario.enero + calendario.febrero;
            break;
        case 4:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo;
            break;
        case 5:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril;
            break;
        case 6:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril
                + calendario.mayo;
            break;
        case 7:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril
                + calendario.mayo + calendario.junio;
            break;
        case 8:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril
                + calendario.mayo + calendario.junio + calendario.julio;
            break;
        case 9:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril
                + calendario.mayo + calendario.junio + calendario.julio + calendario.agosto;
            break;
        case 10:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril
                + calendario.mayo + calendario.junio + calendario.julio + calendario.agosto
                + calendario.septiembre;
            break;
        case 11:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril
                + calendario.mayo + calendario.junio + calendario.julio + calendario.agosto
                + calendario.septiembre + calendario.octubre;
            break;
        case 12:
            indice = dia + calendario.enero + calendario.febrero + calendario.marzo + calendario.abril
                + calendario.mayo + calendario.junio + calendario.julio + calendario.agosto
                + calendario.septiembre + calendario.octubre + calendario.noviembre;
            break;
    }

    return indice;
}
