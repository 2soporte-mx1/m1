
/*
    NOTA: Para agregar nuevas pláticas realiza lo siguiente:
        1.- No tocar código de este script.
        2.- Acceder al archivo workcoffe.json
        3.- Agregar nuevos "objetos" al json

        Nota: Las pláticas se agregan de fecha proxima a fecha más lejana
                es decir, si se tienes las fechas 02, 05, 13, 28, en el Json se agregan
                en este orden:
                02,
                05,
                13,
                28.
                
                De no hacerlo, se presentará un error lógico el cual se verá reflejado en el html.
                pues al darle clic en la fecha 02 se visualizará el contenido de la fecha 28.

                ¡ POR FAVOR DESARROLLADOR ATENDER ESTAS INDICACIONES !
*/

let primerEvento = "";

$(document).ready(function() {
    let mapTable = new Map();
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function() {
        var response = JSON.parse(this.responseText);
        primerEvento = new Date(response.data[0].date + "T00:00:00");

        if (response && response.data) {
            var fechas = response.data.map(function(el) {
                return {
                    'date': el.date
                };
            });
            var nodePrincipal = document.querySelector('.platicas');
            var transformDates = function(date) {
                var month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                var fecha = date.split('-')[1];
                console.info(fecha);
                return date.split('-')[2] + " de " + (month[fecha - 1]);
            }

            response.data.forEach(function(el) {
                if(mapTable.has(el.date)){
                    let contenido = mapTable.get(el.date);
                    contenido  = contenido.replace("center", "");
                    contenido = contenido + `<div class="itemRivs">
                        <div class="cardTalk__image card cardImage_style">
                            <div class="box">
                                <img src="workcoffe/${el.image}" class="img-fluid">
                            </div>
                            <div class="cardTalk__horario">
                            <h5>${transformDates(el.date)} <br> ${el.hour}</h5>
                            <a href="${el.register}" class="cardTalk__registro box-button" onclick="utag.link({interaction_category:'work_cafe',interaction_action:'webinars',interaction_label:'omnicanalidad_como_vender_mas_en_el_mundo'});">Regístrate</a>
                            </div>
                        </div>
                        <div class="cardTalk__info cardTalk_style">
                            <h5 >
                                ${el.speaker}: ${el.title}
                            </h5>
                            <p style="min-height:72px">${el.objective}</p>
                            <p>Plataforma: ${el.platform}</p>
                        </div>
                    </div>
                `;
                mapTable.delete(el.date);
                mapTable.set(el.date, contenido);

                } else {
                    mapTable.set(el.date, `<div class="itemRivs center">
                        <div class="cardTalk__image cardImage_style">
                            <div class="box">
                                <img src="workcoffe/${el.image}" class="img-fluid">
                            </div>
                            <div class="cardTalk__horario">
                                <h5>${transformDates(el.date)} <br> ${el.hour}</h5>
                                <a href="${el.register}" class="cardTalk__registro box-button" onclick="utag.link({interaction_category:'work_cafe',interaction_action:'webinars',interaction_label:'omnicanalidad_como_vender_mas_en_el_mundo'});">Regístrate</a>
                            </div>
                        </div>
                        <div class="cardTalk__info cardTalk_style">
                            <h5>
                                ${el.speaker}: ${el.title}
                            </h5>
                            <p>${el.objective}</p>
                            <p>Plataforma: ${el.platform}</p>
                            
                        </div>
                    </div>
                `);
                }

            });

            let contenidoFinal = "";
            for (let [key, value] of mapTable) {
                console.log(key + ' goes ' + value);
                contenidoFinal =  contenidoFinal + `
                <div>
                    <div class="cardTalk scrollMenuRivs" data-calendar-data='{"date":"${key}"}'>
                        ${value}
                    </div>
                </div>
                
                `;
              }
            $('.platicas').html(contenidoFinal);

            var calendar = new VanillaCalendar({
                selector: "#calendar",
                date: primerEvento
            })

            calendar.set({
                availableDates: fechas,
                datesFilter: true
            })
            var current = new Date();
            var txtDate = "" + current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
            calendar.currentEvent('{"date":"' + txtDate + '"}');

            //SLIDER
            $('.platicas').slick({
                infinite: false,
                slidesToSshow: 1,
                slidesToScroll: 1
            });
            $('.platicas').on('beforeChange', function(event, slick, currentSlide, nextSlide) {

                var currentEvent = $('.platicas div.cardTalk')[nextSlide];
                var eventFecha = $(currentEvent).attr('data-calendar-data');
                calendar.currentEvent(eventFecha);
            });
        };

        /*l*/
    });
    oReq.open("GET", "workcoffe.json");
    oReq.send();

    /*var fechas = [
        {date: '2020-09-03'},
        {date: '2020-09-10'},
        {date: '2020-09-17'},
        {date: '2020-09-24'},
        {date: '2020-09-30'}
        
        
    ];



*/

});