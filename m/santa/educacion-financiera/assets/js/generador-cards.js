let contenidoSeleccionado = '';
let contenido360;
let contenidoVideo;
let contenidoAudio;
let contenidoInfografia;
let htmlFinal;

$(document).ready(function (e) {
    fetch('/educacion-financiera/assets/json/info-cards.json')
        .then(async function (res) { return await res.json(); })
        .then(function (res) {
            extraeDataCards(res);
        }).catch(function (err) {
            console.error(err);
        }).finally(function() {
            initLightbox();
        });
});

const seleccionaContenido = (val) => {
    $(`#${val}`).parent(`#${val}`).css('activa')
    $('body').on('click', '.anchorOpcMenu', function () {
        $('.anchorOpcMenu.activa').removeClass('activa');
        $(this).addClass('activa').removeClass('noActiva');
    });


    switch(val){
        case "inicio":
            mostrarInicio();
            break;
        case "video":
            mostrarVideos();
            break;
        case "calculadora":
            mostrarCalculadora();
            break;
        case "infografia":
            mostrarInfografias()
            mostrar360(false);
            break;
        case "juegos":
            mostrarJuegos();
            break;
        case "audio":
            mostrarAudios();
            break;
    }
}

const extraeDataCards = (res) => {
    /* Código para mostrar siempre el menú */
    let menu = res['menu'];
    generadorCardsHtml(menu[posicion]);
}


generadorCardsHtml = (arr) => {
    let arregloCards = arr['contenido'];
    contenidoSeleccionado = arregloCards.sort((a, b) => a.id - b.id).map(l => {
       htmlFinal = seleccionaTipoRecurso(l)
       $('#resultadoBusqueda').append(htmlFinal);
    }).join('');
}

seleccionaTipoRecurso = (infoCards) => {
    let imprimeContenido = [];

    switch (infoCards.tipo) {
        case 'inicio':
            contenidoInicio = `
                <div class="col-12 col-md-4 col-lg-3 centraContainerBanne card-inicio d-none cards-ef aSubrayar">
                    <div class="cardBusqeuda">
                        <div class="seccionesCards">
                            <div class="imgCard ${infoCards.css}"></div>
                            <div class="txtCard">
                                <div class="div-p">
                                    <h3 class="tituloCard">
                                    ${infoCards.titulo}
                                    </h3>
                                    <p class="txtCard">
                                    ${infoCards.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div class="hashtagCard">
                                <p class="pHashTag">${infoCards.hashtags}</p>
                                
                            </div>
                            <div class="spaceBtnCard">
                                <a class="info" href="${infoCards.url}" target="_blank">
                                    <button class="btnCard">Ver más</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            imprimeContenido.push(contenidoInicio);
            break;
        
        case 'calculadora':
            contenidoCalculadora = `
                <div class="col-12 col-md-4 col-lg-3 centraContainerBanne card-calculadora d-none cards-ef aSubrayar">
                    <div class="cardBusqeuda">
                        <div class="seccionesCards">
                            <div class="imgCard ${infoCards.css}"></div>
                            <div class="txtCard">
                                <div class="div-p">
                                    <h3 class="tituloCard">
                                    ${infoCards.titulo}
                                    </h3>
                                    <p class="txtCard">
                                    ${infoCards.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div class="hashtagCard">
                                <p class="pHashTag">${infoCards.hashtags}</p>
                                
                            </div>
                            <div class="spaceBtnCard">
                                <a class="info" href="${infoCards.url}" target="_blank">
                                    <button class="btnCard">Ver más</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            imprimeContenido.push(contenidoCalculadora);
            break;

            case 'juegos':
                contenidoJuegos = `
                    <div class="col-12 col-md-4 col-lg-3 centraContainerBanne card-juegos d-none cards-ef aSubrayar">
                        <div class="cardBusqeuda">
                            <div class="seccionesCards">
                                <div class="imgCard ${infoCards.css}"></div>
                                <div class="txtCard">
                                    <div class="div-p">
                                        <h3 class="tituloCard">
                                        ${infoCards.titulo}
                                        </h3>
                                        <p class="txtCard">
                                        ${infoCards.descripcion}
                                        </p>
                                    </div>
                                </div>
                                <div class="hashtagCard">
                                    <p class="pHashTag">${infoCards.hashtags}</p>
                                    
                                </div>
                                <div class="spaceBtnCard">
                                    <a class="info" href="${infoCards.url}" target="_blank">
                                        <button class="btnCard">Ver más</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                imprimeContenido.push(contenidoJuegos);
                break;

        case 'video':
            contenidoVideo = `
                <div class="col-12 col-md-4 col-lg-3 centraContainerBanne card-video d-none cards-ef aSubrayar">
                    <div class="cardBusqeuda">
                        <div class="seccionesCards">
                            <div class="imgCard ${infoCards.css}"></div>
                            <div class="txtCard">
                                <div class="div-p">
                                    <h3 class="tituloCard">
                                    ${infoCards.titulo}
                                    </h3>
                                    <p class="txtCard">
                                    ${infoCards.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div class="hashtagCard">
                                <p class="pHashTag">${infoCards.hashtags}</p>
                                
                            </div>
                            <div class="spaceBtnCard">
                                <a class="video" id="${infoCards.idRecurso}" href="https://www.youtube.com/embed/${infoCards.url}"
                                    data-type="iframe" data-caption="" data-options="width:853, height:480" onclick="eventUtag('${infoCards.actionTag}','${infoCards.labelTag}');">
                                    <button class="btnCard">Ver más</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            imprimeContenido.push(contenidoVideo);
            break;

        case '360':
            contenido360 = `
                <div class="col-12 col-md-4 col-lg-3 centraContainerBanne card-360 d-none cards-ef aSubrayar">
                    <div class="cardBusqeuda">
                        <div class="seccionesCards">
                            <div class="imgCard ${infoCards.css}"></div>
                            <div class="txtCard">
                                <div class="div-p">
                                    <h3 class="tituloCard">
                                    ${infoCards.titulo}
                                    </h3>
                                    <p class="txtCard">
                                    ${infoCards.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div class="hashtagCard">
                                <p class="pHashTag">${infoCards.hashtags}</p>
                                
                            </div>
                            <div class="spaceBtnCard">
                                <a class="infografia_360" id="${infoCards.idRecurso}"
                                href="${infoCards.url}"
                                data-type="iframe" data-options="width:720, height:519" onclick="eventUtag('${infoCards.actionTag}','${infoCards.labelTag}');">
                                <button class="btnCard">Ver más</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            imprimeContenido.push(contenido360);
            break;

        case 'audio':
            contenidoAudio = `
                <div class="col-12 col-md-4 col-lg-3 centraContainerBanne card-audio d-none cards-ef aSubrayar">
                    <div class="cardBusqeuda">
                        <div class="seccionesCards">
                            <div class="imgCard ${infoCards.css}"></div>
                            <div class="txtCard">
                                <div class="div-p">
                                    <h3 class="tituloCard">
                                    ${infoCards.titulo}
                                    </h3>
                                    <p class="txtCard">
                                    ${infoCards.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div class="hashtagCard">
                                <p class="pHashTag">${infoCards.hashtags}</p>
                                
                            </div>
                            <div class="spaceBtnCard">
                                <a class="info" href="${infoCards.url}" target="_blank">
                                    <button class="btnCard">Ver más</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            imprimeContenido.push(contenidoAudio);
            break;

        case 'infografia':
            contenidoInfografia = `
                <div class="col-12 col-md-4 col-lg-3 centraContainerBanne card-infografia d-none cards-ef aSubrayar">
                    <div class="cardBusqeuda">
                        <div class="seccionesCards">
                            <div class="imgCard ${infoCards.css}"></div>
                            <div class="txtCard">
                                <div class="div-p">
                                    <h3 class="tituloCard">
                                    ${infoCards.titulo}
                                    </h3>
                                    <p class="txtCard">
                                    ${infoCards.descripcion}
                                    </p>
                                </div>
                            </div>
                            <div class="hashtagCard">
                                <p class="pHashTag">${infoCards.hashtags}</p>
                                
                            </div>
                            <div class="spaceBtnCard">
                                <a class="infografia" title="${infoCards.url}" onclick="eventUtag('${infoCards.actionTag}','${infoCards.labelTag}');">
                                    <button class="btnCard">Ver más</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            imprimeContenido.push(contenidoInfografia);
            break;
    }




    return imprimeContenido;

}


function mostrarInicio(clear = true){
    if(clear) {
        $(".cards-ef").addClass("d-none");
    }
    
    $(".card-inicio").removeClass("d-none");
}

function mostrarVideos(clear = true){
    if(clear) {
        $(".cards-ef").addClass("d-none");
    }
    
    $(".card-video").removeClass("d-none");
}

function mostrarCalculadora(clear = true){
    if(clear) {
        $(".cards-ef").addClass("d-none");
    }
    
    $(".card-calculadora").removeClass("d-none");
}

function mostrarJuegos(clear = true){
    if(clear) {
        $(".cards-ef").addClass("d-none");
    }
    
    $(".card-juegos").removeClass("d-none");
}


function mostrar360(clear = true){
    if(clear) {
        $(".cards-ef").addClass("d-none");
    }

    $(".card-360").removeClass("d-none");
}

function mostrarAudios(clear = true){
    if(clear) {
        $(".cards-ef").addClass("d-none");
    }

    $(".card-audio").removeClass("d-none");
}

function mostrarInfografias(clear = true){
    if(clear) {
        $(".cards-ef").addClass("d-none");
    }

    $(".card-infografia").removeClass("d-none");
}