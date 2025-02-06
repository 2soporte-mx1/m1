let contenidoSelected;
let jsonContenido;
let arregloFinal;
let titulosEncontrados;
let opciones
let arrEncabezados
let cardInfo
let titulo
let mensajeBusqueda
let respuesta;
let cadena;


const iniciarBusqueda = (palabra) => {

    if (palabra.length === 0 || palabra === '') {


        $('#resultadoBusqueda').empty()
        $('#contenido1').empty()
        $('#contenidoEducFin').css('display', 'block');

        /* 
        $('#seccionResultadosBusqueda').css('display', 'none'); */

    } else {

        $('#contenido1').empty()
        $('#contenidoEducFin').css('display', 'none');
        palabra = palabra.toLowerCase()
        palabra = eliminaCaracteresRaros(palabra)

        fetch('./assets/json/info-cards.json')
            .then(async function (res) { return await res.json(); })
            .then(function (res) {

                contenidoSelected = '';
                jsonContenido = res['menu'];
                titulosEncontrados = [];
                arregloFinal = [];
                arrConcatenado = [];

                /* Con está función extraigo todas las secciones de las cards */
                for (opciones of jsonContenido) {
                    arrEncabezados = opciones.contenido;
                    /* Aquí meto toda la info de las cards en un solo arreglo */
                    arrEncabezados.forEach(el => {
                       
                        /* el.titulo =  el.titulo.toLowerCase();
                        el.descripcion =  el.descripcion.toLowerCase();
                        el.hashtags = el.hashtags.toLowerCase();

                        el.titulo = eliminaCaracteresRaros(el.titulo)
                        el.descripcion= eliminaCaracteresRaros(el.descripcion)
                        el.hashtags= eliminaCaracteresRaros(el.hashtags) */

                        arregloFinal.push(el)
                    });
                }
                
                for (cardInfo of arregloFinal) {

                    /* Se obtiene todo el texto de las cards */


                    titulo = cardInfo.titulo;
                    titulo = eliminaCaracteresRaros(titulo.toLowerCase());

                    descripcion = cardInfo.descripcion;
                    descripcion = eliminaCaracteresRaros(descripcion.toLowerCase());

                    hashtags = cardInfo.hashtags;
                    hashtags = eliminaCaracteresRaros(hashtags.toLowerCase());

                    cadena = `${titulo} ${descripcion} ${hashtags}`


                    /*  if (titulo.indexOf(palabra) >= 0) {
                         titulosEncontrados.push(cardInfo)
                     }  */

                    if (cadena.indexOf(palabra) >= 0) {
                        arrConcatenado.push(cardInfo)
                    }



                }

                if (arrConcatenado.length > 0) {
                    $('#resultadoBusqueda').empty()
                    mensajeBusqueda = `<p class="mt-5 pResultados1">Resultados relacionados con: <strong>${palabra}</strong></p>
                                     <br>
                                     <p class="pResultados2">${arrConcatenado.length} resultados</p> 
                                     
                                     `
                    $('#resultadoBusqueda').append(mensajeBusqueda);
                } else {
                    $('#resultadoBusqueda').empty()
                    mensajeBusqueda = `<p class="mt-5">Resultados relacionados con: <strong>${palabra}</strong></p>

                    <div class="centraResBusq">
                    <img class="lupa-busqueda" src="./assets/img/lupa-busqueda.png" alt="">
                    <p class="p3Busqueda">
                    No hay resultados que coincidan con tu búsqueda
                    </p>
                    <ul>
                    <li class="liBusqueda">Revisa la ortografía de la palabra.</li>
                    <li class="liBusqueda">Utiliza palabras más genéricas.</li>
                    </ul>
                    </div>
                    `
                    $('#resultadoBusqueda').append(mensajeBusqueda);
                }

                $('#contenido1').empty();

                arrConcatenado.sort((a, b) => a.id - b.id).map(l => {
                    contenidoSelected += seleccionaTipoRecurso(l);
                }).join('');

                $('#contenido1').append(contenidoSelected);
                $('#contenido1 .d-none').removeClass("d-none");
                
               /*  subrayaPalabraBusqueda(palabra) */


            }).catch(function (err) {
                console.error(err);
            }).finally(function () {

                $("#contenido1 .video").each(function (index, item) {
                    $(item).attr("id", "video-busqueda" + index);
                    $("#video-busqueda" + index).iLightBox();
                });

                $("#contenido1 .infografia_360").each(function (index, item) {
                    $(item).attr("id", "infografia-360-busqueda" + index);
                    $("#infografia-360-busqueda" + index).iLightBox();
                });

            });
    }
}

const filtrarCategorias = (categoria) => {
    $('#contenido1').empty()
    $('#contenidoEducFin').css('display', 'none');
    categoria = categoria.toLowerCase()
    categoria = eliminaCaracteresRaros(categoria)
    

    fetch('./assets/json/info-cards.json')
        .then(async function (res) { return await res.json(); })
        .then(function (res) {

            contenidoSelected = '';
            jsonContenido = res['menu'];
            titulosEncontrados = [];
            arregloFinal = [];

            /* Con está función extraigo todas las secciones de las cards */
            for (opciones of jsonContenido) {
                arrEncabezados = opciones.contenido;
                /* Aquí meto toda la info de las cards en un solo arreglo */
                arrEncabezados.forEach(el => {
                    /* el.hashtags = el.hashtags.toLowerCase(); */


                    /* el.titulo =  el.titulo.toLowerCase();
                    el.descripcion =  el.descripcion.toLowerCase();
                    el.hashtags = el.hashtags.toLowerCase();

                    el.titulo = eliminaCaracteresRaros(el.titulo)
                    el.descripcion= eliminaCaracteresRaros(el.descripcion)
                    el.hashtags= eliminaCaracteresRaros(el.hashtags)  */

                    
                    arregloFinal.push(el)
                });
            }

            for (cardInfo of arregloFinal) {

                /* Se obtienen los titulos de las cards */
               /*  titulo = cardInfo.hashtags; */

                titulo = cardInfo.titulo;
                titulo = eliminaCaracteresRaros(titulo.toLowerCase());

                descripcion = cardInfo.descripcion;
                descripcion = eliminaCaracteresRaros(descripcion.toLowerCase());

                hashtags = cardInfo.hashtags;
                hashtags = eliminaCaracteresRaros(hashtags.toLowerCase());

               cadena = `${titulo} ${descripcion} ${hashtags}`


                if (cadena.indexOf(categoria) >= 0) {
                    titulosEncontrados.push(cardInfo)
                }
            }

            if (titulosEncontrados.length > 0) {
                $('#resultadoBusqueda').empty()
                mensajeBusqueda = `<p class="mt-5 pResultados1">Resultados relacionados con: <strong>${categoria}</strong></p>
                                 <br>
                                 <p class="pResultados2">${titulosEncontrados.length} resultados</p> 
                                 
                                 `
                $('#resultadoBusqueda').append(mensajeBusqueda);
            } else {
                $('#resultadoBusqueda').empty()
                mensajeBusqueda = `<p class="mt-5">Resultados relacionados con: <strong>${categoria}</strong></p>

                <div class="centraResBusq">
                <img class="lupa-busqueda" src="./assets/img/lupa-busqueda.png" alt="">
                <p class="p3Busqueda">
                No hay resultados que coincidan con tu búsqueda
                </p>
                <ul>
                <li class="liBusqueda">Revisa la ortografía de la categoria.</li>
                <li class="liBusqueda">Utiliza palabra más genéricas.</li>
                </ul>
                </div>
                                 
                
                `
                $('#resultadoBusqueda').append(mensajeBusqueda);
            }

            $('#contenido1').empty();

            titulosEncontrados.sort((a, b) => a.id - b.id).map(l => {
                contenidoSelected += seleccionaTipoRecurso(l);
            }).join('');

            $('#contenido1').append(contenidoSelected);

        }).catch(function (err) {
            console.error(err);
        }).finally(function () {

            $('#contenido1 .d-none').removeClass("d-none");

            $("#contenido1 .video").each(function (index, item) {
                $(item).attr("id", "video-busqueda" + index);
                $("#video-busqueda" + index).iLightBox();
            });

            $("#contenido1 .infografia_360").each(function (index, item) {
                $(item).attr("id", "infografia-360-busqueda" + index);
                $("#infografia-360-busqueda" + index).iLightBox();
            });

        });
}

const reiniciar = () => {
    $('#resultadoBusqueda').empty()
    $('#contenido1').empty()
    $('#contenidoEducFin').css('display', 'block');

}

$(document).ready(function (e) {
    let urlTarjeta = obtenerParametroUrl();
    if(urlTarjeta!==undefined){
        filtrarCategorias(urlTarjeta)
    }
});

function escapeSpecialChars(str){
    return str
        .replace(/\&/g, "")
        .replace(/\>/g, "")
        .replace(/\</g, "")
        .replace(/\"/g, "")
        .replace(/\'/g, "")
        .replace(/\;/g, "")
        .replace(/\./g, "")
        .replace(/\,/g, "")
        .replace(/\//g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
}

const obtenerParametroUrl = () => {

    let tarjetaEncontrada;
    let valores = window.location.search;
    let urlParams = new URLSearchParams(valores);
    if (urlParams.has('categoria')) {
        let values = urlParams.values();

        for (let value of values) {
            tarjetaEncontrada = escapeSpecialChars(value)
        }

    } else {
        console.log('No encontré url :c');
        return
    }

    return tarjetaEncontrada;
}

const eliminaCaracteresRaros = (txt) => {
    let elimina = txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return elimina;
}


/* const subrayaPalabraBusqueda = (variable) =>{
    let result = [];
   

    let elementos = document.getElementsByClassName("aSubrayar")
   
    for(let i = 0; i<elementos.length;i++){
        if(elementos[i].innerHTML !== `${variable}`){
            result.push(elementos[i].innerHTML);
        }
    }
    
} */


$('input').on('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z 0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
});