class tags {

    /* TAGGEO CORRESPONDIENTE A LA LANDING PAGE "MEMBERS-SAMSUNG" */

    /* Category */
    category = "trae-tu-nomina-no-cliente";

    /* Actions */
    submenu = "menu";
    beneficios = "mas-beneficios";
    portabilidad = "como-hacer-portabilidad";
    video = "video-cambio-nomina";
    telefono = "resolvemos-dudas";
    preguntas = "preguntas-frecuentes";
    telsuperlinea = "superlinea";
    nuestrosProductos = "nuestros_productos";
    
    /* Labels correspondiente a menu */
    submenu_opt1 = "beneficios";
    submenu_opt2 = "como-hacer-cambio";
    submenu_opt3 = "preguntas-frecuentes";

    /* Labels correspondiente a beneficios */
    beneficios_opt1 = "aqui";

    /* Labels correspondiente a portabilidad */
    portabilidad_opt1 = "aqui";
    portabilidad_opt_verano = "verano_portabilidad_samsung_aqui";

    /* Labels correspondiente a video */
    video_opt1 = "ver-video";

    /* Labels correspondiente a resolvemos tus dudas */
    telefono_opt1 = "5551694322";

    /* Labels correspondiente a preguntas frecuentes */
    preguntas_opt1 = "que-es-portabilidad";
    preguntas_opt2 = "como-realizo-portabilidad";
    preguntas_opt3 = "no-tengo-cuenta";
    preguntas_opt4 = "cuanto-tiempo-pasara";
    preguntas_opt5 = "tengo-que-cancelar";
    preguntas_opt6 = "puedo-seguir-recibiendo";
    preguntas_opt7 = "portabilidad-credito-contratado";
    preguntas_opt8 = "portabilidad-otro-banco";


    desdeMexico = "5551694304";
    desdeExtranj = "18447058077";



     /* ======================== */
    /* Labels nuestrosProductos */
    /* ======================== */
    tarjetas = "tarjetas_de_credito";
    cuentas = "opc_cuentas";
    inversiones = "opc_inversiones";
    credHipot = "credito_hipotecario";
    credAutom = "credito_automotriz";
    credPers = "credito_personal";
    seguros = "seguros";
    traeTuNom = "trae_tu_nomina";
}


const eventUtag = (paso1Action, paso1Label) => {

    let descargaDatos = new tags();

    utag.link({
        interaction_category: descargaDatos["category"], //required
        interaction_action: descargaDatos[paso1Action], //required
        interaction_label: descargaDatos[paso1Label], //required
    });

}