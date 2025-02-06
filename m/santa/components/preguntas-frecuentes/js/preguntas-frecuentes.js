function generateSectionFrequentQuestions (url_questions) {
    fetch(url_questions)
        .then(async function (data) { return await data.json(); })
        .then(function (data) {
            section =   '<div class="container-fluid contenedor div-preguntas-frecuentes">' +
            '<div class="row">' +
                '<div class="col-12 col-lg-3">' +
                    '<h4>PREGUNTAS FRECUENTES</h4>' +
                    '<h3>¡Respondemos <br class="desktop">tus preguntas!</h3>' +
                '</div>' +
                '<div class="col-12 col-lg-9">' +
                    '<div class="card">'

            for (var i in data.preguntas_frecuentes) {
                section += '<div class="card-body mb-2 p-0">' +
                                '<div class="cursor d-flex justify-content-between align-items-center p-3 div-pregunta ver"' +
                                    'data-toggle="collapse" data-target="#multiCollapse' + (parseInt(i) + 1) + ' " aria-expanded="false"' +
                                    'aria-controls="multiCollapse' + (parseInt(i) + 1) + '" data-pregunta="' + (parseInt(i) + 1) + '">' +
                                    '<div>' +
                                        '<p class="mb-0 pregunta pr-0 pr-lg-5">' +
                                            data.preguntas_frecuentes[i].pregunta +
                                        '</p>' +
                                    '</div>' +
                                    '<div class="pr-0 pr-lg-3 ver-ocultar">' +
                                        '<p class="mb-0 icono">Ver <i class="fas fa-eye pl-2"></i></p>' +
                                    '</div>' +
                                '</div>' +

                                '<div class="collapse multi-collapse px-3 pb-3" id="multiCollapse' + (parseInt(i) + 1) + '">' +
                                    '<p class="mb-0 respuesta">' +
                                        data.preguntas_frecuentes[i].respuesta +
                                    '</p>' +
                                '</div>'+
                            '</div>';
                }
            section +=  '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

            $("#preguntas-frecuentes").html(section);



            $('.multi-collapse').on('show.bs.collapse', function () {
            $(this).parent().find(".ver-ocultar p").html("Ocultar <i class='fas fa-eye-slash pl-2'></i>");
            $(this).parent().find(".div-pregunta").addClass("ocultar").removeClass("ver");
            });

            $('.multi-collapse').on('hide.bs.collapse', function () {
            $(this).parent().find(".ver-ocultar p").html("Ver <i class='fas fa-eye pl-2'></i>");
            $(this).parent().find(".div-pregunta").addClass("ver").removeClass("ocultar");
            });
        }).catch(function (err) {
            console.error("ERROR", err);
        });
}