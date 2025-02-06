let tam = 0;
$(document).ready(function (e) {
    realizaPeticionJson(1, 1);
});
const muestraCategoriaTdc = (opc) => {
    $(".formaDelBtn").removeClass("opActiva");
    $("#" + opc).addClass("opActiva");
    enviaIdCategoriaTdc(opc);
}
const enviaIdCategoriaTdc = (id) => {
    realizaPeticionJson(1, id);
}
const realizaPeticionJson = (estatus, id) => {
    fetch('./assets-nuevo-sitio/json/tdc-info.json')
        .then(async function (res) { return await res.json(); })
        .then(function (res) {
            if (estatus === 0) {
                muestraTodasTarjetas(res, 0);
            } else {
                recibeParamPeticionJson(res, id);
            }
        }).catch(function (err) {
            console.error(err);
        });
}

const recibeParamPeticionJson = (respuesta, identificador) => {
    switch (identificador) {
        case 1:
            muestraTdcMasSolicitadas(respuesta, identificador);
            break;

        case 2:
            muestraTdcRecompensas(respuesta, identificador);
            break;

        case 3:
            muestraTdcOtrasTarjetas(respuesta, identificador);
            break;

        case 4:
            muestraTdcNoOfertables(respuesta, identificador);
            break;

        case 5:
            muestraTdcViajes(respuesta, identificador);
            break;

        case 6:
            muestraTdcUniversitarios(respuesta, identificador);
            break;

        case 7:
            muestraTdcCorporativas(respuesta, identificador);
            break;

        case 8:
            muestraTodasTarjetas(respuesta, identificador);
            break;
    }
}
const muestraTdcMasSolicitadas = (res, num) => {
    limpiarFiltrado();
    let arrFinal = obtenArregloDeTarjetas(res, num - 1);
    imprimeHtml(arrFinal);
    verificaPromocion(res, num);
    verificaBanner(res, num);
}

const muestraTdcRecompensas = (res, num) => {
    limpiarFiltrado();
    let arrFinal = obtenArregloDeTarjetas(res, num - 1);
    imprimeHtml(arrFinal)
    verificaPromocion(res, num);
    verificaBanner(res, num);
}

const muestraTdcOtrasTarjetas = (res, num) => {
    limpiarFiltrado();
    let arrFinal = obtenArregloDeTarjetas(res, num - 1);
    imprimeHtml(arrFinal)
    verificaPromocion(res, num);
    verificaBanner(res, num);
}

const muestraTdcNoOfertables = (res, num) => {
    limpiarFiltrado();
    let arrFinal = obtenArregloDeTarjetas(res, num - 1);
    imprimeHtml(arrFinal)
    verificaPromocion(res, num);
    verificaBanner(res, num);
}

const muestraTdcViajes = (res, num) => {
    limpiarFiltrado();
    let arrFinal = obtenArregloDeTarjetas(res, num - 1);
    imprimeHtml(arrFinal);
    verificaPromocion(res, num);
    verificaBanner(res, num);
}

const muestraTdcUniversitarios = (res, num) => {
    limpiarFiltrado();
    let arrFinal = obtenArregloDeTarjetas(res, num - 1);
    imprimeHtml(arrFinal)
    verificaPromocion(res, num);
    verificaBanner(res, num);
}

const muestraTdcCorporativas = (res, num) => {
    limpiarFiltrado();
    let arrFinal = obtenArregloDeTarjetas(res, num - 1);
    imprimeHtml(arrFinal)
    verificaPromocion(res, num);
    verificaBanner(res, num);
}

const muestraTodasTarjetas = (res, num) => {
    limpiarFiltrado();

    let jsonOpciones = res['menu'];
    let contenidoAmostrar = jsonOpciones;
    let arrTodasTdc = [];

    for (let i = 0; i < contenidoAmostrar.length; i++) {
        for (let j of contenidoAmostrar[i].contenido) {
            arrTodasTdc.push(j)
        }
    }

    let contenidoSeleccionado = '';

    let bullets = ''

    contenidoSeleccionado = arrTodasTdc.map(l => {
        bullets = (l.preview).sort((a, b) => a.id - b.id).map(m => {
            return `
           <div>
           <div class="containerCheckRed">
           <img class="checkRed"
           src="./assets-nuevo-sitio/img/iconos/check-red.png" alt="">
           ${m}
           </div>
           </div>
           
           `
        }).join('');


        let determinaTipoTdc = '';
        let ofertable = ''
        let noOfertable = '';
        let vertical = '';
        let horizontal = '';
        let botones = '';
        let label = ''



        if (l.tipo === 1) {
            ofertable = ` <img class="img4-card-mini ${l.css}"
            src="${l.img}" alt="${removeAccents(l.tarjeta)}">`;
            determinaTipoTdc = ofertable;

            botones = `

            <div class="col-12 col-md-6 containerBtns order-2 order-md-1">
                <div class="contenedorLinkBtn">
                    <a class="linkConoceMás" href="${l.event_link[0]}" onclick="eventUtag('${l.event_action}','${l.event_label[0]}')">Conoce más</a>
                </div>
            </div> `;

            if(l.solicitar != null && l.solicitar == 1) {
                botones += `
                    <div class="col-12 col-md-6 containerBtns order-1 order-md-2">
                        <div class="contenedorLinkBtn">
                        <a class="linkConoceMás" href="${l.event_link[1]}" onclick="eventUtag('${l.event_action}','${l.event_label[1]}')">
                            <button class="btnRedSantanderCards">Solicitar</button>
                        </a>
                        </div>
                    </div>
                `;
            }

        } else {
            botones = `
            <div class="col-12 col-md-6 containerBtns order-2 order-md-1">
                <div class="contenedorLinkBtn">
                    <a class="linkConoceMás" href="${l.event_link[0]}" onclick="eventUtag('${l.event_action}','${l.event_label[0]}')">Conoce más</a>
                </div>
            </div>
            `

            if (l.css === 'vertical') {

                noOfertable = `
            <img class="img4-card-mini vertical"
            src="${l.img}" alt="${removeAccents(l.tarjeta)}">
            <div class="noOfertableVertical"></div>`
                determinaTipoTdc = noOfertable;

            } else {

                noOfertable = `
                <img class="img4-card-mini horizontal"
                src="${l.img}" alt="${removeAccents(l.tarjeta)}">
                <div class="noOfertable"></div>`
                determinaTipoTdc = noOfertable;

            }
        }


        if (l.tieneLabel === true){
            if (l.css === 'vertical') {
                label = `
                <img class="labelCardVertical"
                src="./assets-nuevo-sitio/img/labels/label-${l.label}.png" alt="">
                `
            } else {
                label = `
                <img class="labelCardHorizontal"
                src="./assets-nuevo-sitio/img/labels/label-${l.label}.png" alt="">
                `
            }



            

        }else{
            label = `
                <img class="sinLabel"
                src="./assets-nuevo-sitio/img/labels/label-nueva.png" alt="">
                `
        }
        
        let _card = `


        <div class="col-12 col-md-12 col-lg-6">
        <div class="centraInfoPromocional contenedorImgPromocional">
            <div class="tamCard centrsInfoCard">
                <div class="contenedorCard">
                    <div class="row">
                        <h2 class="divTituloTarjeta fuenteTituloTarjeta">
                            ${l.tarjeta}
                        </h2>
                    </div>
                    <div class="row apartadoImgCard">
                        <div class="col-12 col-md-5 espacioInfoCards">
                            <div class="contImgCard">


                           ${label}


                                <img class="img1-elipses"
                                    src="./assets-nuevo-sitio/img/piezas/img1-elipses.png" alt="">
                                <img class="img2-puntos"
                                    src="./assets-nuevo-sitio/img/piezas/img2-puntos.png" alt="">
                                <img class="img3-sombra"
                                    src="./assets-nuevo-sitio/img/piezas/img3-sombra.png" alt="">
                                    ${determinaTipoTdc}
                            </div>
                        </div>
                        <div class="col-12 col-md-7 espacioInfoCards">
                            <div class="contTxtCard">
                            <div class="contenedorFijoBullets">    
                            ${bullets}
                            </div>

                                <div class="contenedorIngresoAnualidad">
                                    <div class="txtIngresoMin">
                                        <p class="pIngMin">${l.requisitoCard}</p>
                                        <p class="pCantidadIngMin">${l.ingresoMinimo}</p>
                                    </div>`

                                    if(l.requisitoCard2 != null) {
                                        _card += `<div class="txtIngresoMin">
                                            <p class="pIngMin">${l.requisitoCard2}</p>
                                            <p class="pCantidadIngMin">${l.ingresoMinimo2}</p>
                                        </div> `
                                    }
                                    
                           _card += `<div class="txtAnualidad">
                                        <p class="pIngMin">Anualidad</p>
                                        <p class="pCantidadIngMin">${l.anualidad} <span class="spanSinIva">sin
                                                Iva</span> </p>
                                    </div>
                                </div>

                                <div class="row contenedorLinksYbtn">
                                    ${botones}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
        
        `

        return _card;

    }).join('');
    $('#apartadoTdc').append(contenidoSeleccionado);
}
const obtenArregloDeTarjetas = (arr, n) => {
    let jsonOpciones = arr['menu'];
    let contenidoAmostrar = jsonOpciones[n];
    let retornaArrObjetos = contenidoAmostrar.contenido;
    return retornaArrObjetos;
}
const imprimeHtml = (tdcSelec) => {
    let contenidoSeleccionado = '';
    contenidoSeleccionado = tdcSelec.sort((a, b) => a.id - b.id).map(l => {


        bullets = (l.preview).sort((a, b) => a.id - b.id).map(m => {
            return `
           <div>
           <div class="containerCheckRed">
           <img class="checkRed"
           src="./assets-nuevo-sitio/img/iconos/check-red.png" alt="">
           ${m}
           </div>
           </div>
           `
        }).join('');


        let determinaTipoTdc = '';
        let ofertable = ''
        let noOfertable = '';
        let botones = '';
        let label = ''


        if (l.tipo === 1) {


            ofertable = ` <img class="img4-card-mini ${l.css}"
            src="${l.img}" alt="${removeAccents(l.tarjeta)}">`;
            determinaTipoTdc = ofertable;



            botones = `

            <div class="col-12 col-md-6 containerBtns order-2 order-md-1">
                <div class="contenedorLinkBtn">
                    <a class="linkConoceMás" href="${l.event_link[0]}" onclick="eventUtag('${l.event_action}','${l.event_label[0]}')">Conoce más</a>
                </div>
            </div>
            `;

            if(l.solicitar != null && l.solicitar == 1) {
                botones += `
                    <div class="col-12 col-md-6 containerBtns order-1 order-md-2">
                        <div class="contenedorLinkBtn">
                        <a class="linkConoceMás" href="${l.event_link[1]}" onclick="eventUtag('${l.event_action}','${l.event_label[1]}')">
                            <button class="btnRedSantanderCards">Solicitar</button>
                        </a>
                        </div>
                    </div>
                `;
            }



        } else {
            botones = `

            <div class="col-12 col-md-6 containerBtns order-2 order-md-1">
                <div class="contenedorLinkBtn">
                <a class="linkConoceMás" href="${l.event_link[0]}" onclick="eventUtag('${l.event_action}','${l.event_label[0]}')">Conoce más</a>
                </div>
            </div>
            `


            if (l.css === 'vertical') {

                noOfertable = `
            <img class="img4-card-mini vertical"
            src="${l.img}" alt="${removeAccents(l.tarjeta)}">
            <div class="noOfertableVertical"></div>`
                determinaTipoTdc = noOfertable;

            } else {

                noOfertable = `
                <img class="img4-card-mini horizontal"
                src="${l.img}" alt="${removeAccents(l.tarjeta)}">
                <div class="noOfertable"></div>`
                determinaTipoTdc = noOfertable;

            }
        }


        if (l.tieneLabel === true){
            if (l.css === 'vertical') {
                label = `
                <img class="labelCardVertical"
                src="./assets-nuevo-sitio/img/labels/label-${l.label}.png" alt="">
                `
            } else {
                label = `
                <img class="labelCardHorizontal"
                src="./assets-nuevo-sitio/img/labels/label-${l.label}.png" alt="">
                `
            }



            

        }else{
            label = `
                <img class="sinLabel"
                src="./assets-nuevo-sitio/img/labels/label-nueva.png" alt="">
                `
        }



        let _card =  `
        <div class="col-12 col-md-12 col-lg-6">
        <div class="centraInfoPromocional contenedorImgPromocional">
            <div class="tamCard centrsInfoCard">
                <div class="contenedorCard">
                    <div class="row">
                        <h2 class="divTituloTarjeta fuenteTituloTarjeta">
                            ${l.tarjeta}
                        </h2>
                    </div>
                    <div class="row apartadoImgCard">
                        <div class="col-12 col-md-5 espacioInfoCards">
                            <div class="contImgCard">
                            ${label}
                                <img class="img1-elipses"
                                    src="./assets-nuevo-sitio/img/piezas/img1-elipses.png" alt="">
                                <img class="img2-puntos"
                                    src="./assets-nuevo-sitio/img/piezas/img2-puntos.png" alt="">
                                <img class="img3-sombra"
                                    src="./assets-nuevo-sitio/img/piezas/img3-sombra.png" alt="">
                                    ${determinaTipoTdc}
                            </div>
                        </div>
                        <div class="col-12 col-md-7 espacioInfoCards">
                            <div class="contTxtCard">
                            <div class="contenedorFijoBullets"> 
                            ${bullets}
                            </div>
                                <div class="contenedorIngresoAnualidad">
                                    <div class="txtIngresoMin">
                                        <p class="pIngMin">${l.requisitoCard}</p>
                                        <p class="pCantidadIngMin">${l.ingresoMinimo}</p>
                                    </div> `

                                    if(l.requisitoCard2 != null) {
                                        _card += `<div class="txtIngresoMin">
                                            <p class="pIngMin">${l.requisitoCard2}</p>
                                            <p class="pCantidadIngMin">${l.ingresoMinimo2}</p>
                                        </div> `
                                    }
                                    
                                    _card += `<div class="txtAnualidad">
                                        <p class="pIngMin">Anualidad</p>
                                        <p class="pCantidadIngMin">${l.anualidad} <span class="spanSinIva">sin
                                                Iva</span> </p>
                                    </div>
                                </div>

                                <div class="row contenedorLinksYbtn">

                                ${botones}
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
        
        `

    return _card;

    }).join('');
    $('#apartadoTdc').append(contenidoSeleccionado);
}
const verificaPromocion = (resp, numero) => {
    let menu = resp.menu;
    let categoria = menu[numero - 1];
    let arrInfoCarPromo = [];
    arrInfoCarPromo = categoria.contenido;
    let tdcPromo = {
        img: "",
        title: "",
        nombre: "",
        beneficios: "",
        url: "",
        css: "",
        ea: "",
        el: ""
    }
    let arrFinalTdc = [];
    // verificamos si hay tarjeta promocional
    if (categoria.hayPromocion) {

        // Buscamos dentro de toda la categoría la tarjeta que coincida con el id que está en promo
        let tarjetaPromocional = arrInfoCarPromo.find(element => element.id === categoria.idDeTarjetaPromocional);

        tdcPromo.img = tarjetaPromocional.img;
        tdcPromo.title = categoria.tituloPromocional;
        tdcPromo.nombre = tarjetaPromocional.tarjeta;
        tdcPromo.beneficios = tarjetaPromocional.beneficios;
        tdcPromo.url = tarjetaPromocional.url;
        tdcPromo.css = tarjetaPromocional.css;
        tdcPromo.ea = categoria.event_action;
        tdcPromo.el = tarjetaPromocional.event_label;
    } else {
        return
    }


    arrFinalTdc.push(tdcPromo)

    imprimeTarjetaPromocional(arrFinalTdc)

}
const imprimeTarjetaPromocional = (tdc) => {
    let contenidoSeleccionado = '';
    contenidoSeleccionado = tdc.sort((a, b) => a.id - b.id).map(l => {

        bullets = (l.beneficios).sort((a, b) => a.id - b.id).map(m => {

            return `
            <div class="containerInfoPromoc">
            <div class="containerCheckRed">
                <img class="checkRed" src="./assets-nuevo-sitio/img/iconos/check-red.png" alt="">
                ${m}
            </div>
        </div>
           `
        }).join('');

        let determinaPosicionTdc = '';
        let vertical = ''
        let horizontal = '';


        if (l.css === 'vertical') {
            vertical = `<img class="img4Vertical centraImgPromocional" src="${l.img}" alt="">`
            determinaPosicionTdc = vertical;

        } else {

            horizontal = `<img class="img4Horizontal centraImgPromocional" src="${l.img}" alt="">`
            determinaPosicionTdc = horizontal;

        }


        return `
        <section class="seccionCardPromocional">
    <div class="row">
        <div class="col-12" id="tituloMobilePromocional">
            <div class="centraInfoPromocional contenedorTxtPromocional">
                <p class="txtBicolor">${l.title}</p>
                <p class="titleCardPromocional">${l.nombre}</p>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="centraInfoPromocional contenedorImgPromocional">

                <div class="espacioImgPromocional">
                    <img class="img1 centraImgPromocional" src="./assets-nuevo-sitio/img/piezas/img1-onduladas.png"
                        alt="">
                    <img class="img2 centraImgPromocional" src="./assets-nuevo-sitio/img/piezas/img2-rayos.png" alt="">
                    <img class="img3" src="./assets-nuevo-sitio/img/piezas/img3-sombra.png" alt="">
                    ${determinaPosicionTdc}
                </div>

            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="centraInfoPromocional contenedorTxtPromocional">
                <div class="containerInfoPromoc txtMobilePromo">
                    <p class="txtBicolor">${l.title}</p>
                </div>
                <div class="containerInfoPromoc txtMobilePromo">
                    <p class="titleCardPromocional">${l.nombre}</p>
                </div>
                ${bullets}
                <div class="contenedorBtnRedPromocional">
                <a href="" onclick="eventUtag('${l.ea}','${l.el[0]}')">
                <button class="btnRedSantanderCardPromocional" >
                        Conoce más
                </button>
                </a>
                </div>
            </div>
        </div>
    </div>
</section>
           `
    }).join('');
    $('#seccionPromocional').append(contenidoSeleccionado);
}
const verificaBanner = (resp, numero) => {

    let menu = resp.menu;
    let categoria = menu[numero - 1];
    let arrInfoCarPromo = [];
    arrInfoCarPromo = categoria.contenido;

    let tdcPromo = {
        img: "",
        title: "",
        copy: "",
        url: "",
        ea: "",
        el: ""
    }

    let arrFinalTdc = [];


    if (categoria.hayBanner) {
        let tarjetaPromocional = arrInfoCarPromo.find(element => element.id === categoria.idDeTarjetaPromocional);
        tdcPromo.img = categoria.imgBanner;
        tdcPromo.title = categoria.tituloBanner;
        tdcPromo.copy = categoria.coppyBanner;
        tdcPromo.url = categoria.urlBanner;
        tdcPromo.ea = categoria.event_action2;
        tdcPromo.el = tarjetaPromocional.event_label;
    } else {
        return
    }

    arrFinalTdc.push(tdcPromo)

    imprimeBanner(arrFinalTdc)

}
const imprimeBanner = (tdc) => {

    let contenidoSeleccionado = '';
    contenidoSeleccionado = tdc.sort((a, b) => a.id - b.id).map(l => {

        return `
        <div class="contBannerTdc"></div>
            <div class="contInfoBannerTdc">
                <div class="container altura100">
                    <div class="row altura100">
                        <div class="col-12 col-md-6 altura100">
                            <img class="imgBannerTdcPromo"
                                src="${l.img}" alt="">
                        </div>
                        <div class="col-12 col-md-6 altura100 contTxtBannTdcPromo">
                            <div class="txtTdcProm">
                                <p class="pTitleBannTdcPromo">${l.title}</p>
                                <p class="pTxtBannTdcPromo">${l.copy}</p>
                                <div class="contBtnTxtBannProm">
                                <a href="${l.url}" onclick="eventUtag('${l.ea}','${l.el[0]}')">
                                    <button class="btnWhiteSantander">Conoce más</button>
                                </a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        
           `
    }).join('');
    $('#seccionBannerTdc').append(contenidoSeleccionado);
}
const limpiarFiltrado = () => {
    $('#apartadoTdc').empty()
    $('#seccionPromocional').empty()
    $('#seccionBannerTdc').empty()
}

const removeAccents = (str) => {
    str = str.replace(/\s+/g, '-');
    str = str.toLowerCase();
    str = str.replace(/[¿?]/g,"")
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}