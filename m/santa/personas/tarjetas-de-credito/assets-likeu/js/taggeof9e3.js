class tags {

    /* TAGGEO CORRESPONDIENTE A LA LANDING PAGE "MEMBERS-SAMSUNG" */

    /* Category */
    category = "likeu";

    /* Actions */
    breadcrumbs = "breadcrumbs_banner_principal";
    bannerPrincipal = "banner_principal";
    beneficios = "beneficios"
    comoObtenerla = "como_obtenerla";
    yaActivasteTuTarjeta = "activala";
    SeccRequisitos = "requisitos"
    descargas = "descargas";
    preguntasFrecuentes = "preguntas_frecuentes";
    otrasOpcionesParaTi = "otras_opciones_para_ti";
    superlinea = "superlinea"
    menuSuperior = "menu_superior";

    bannerBuenFin = "banner_buen_fin";

    preg3nueva = "que_comisiones_tiene";


    

    /*Nueva sección (Action) "Activa tu asistencia" */
    activaAsistencia = "activa_tus_asistencias";

    paquetesAsistencia = "preguntas_frecuentes-paquetes_asistencia";
    cualesTelefonos = "preguntas_frecuentes-telefonos_de_contacto";

    nuestrosProductos = "seccion_nuestros_productos"


    /* esta pregunta se convierte en action -> preg7 = "como_puedo_usar_beneficios" */
    pregunta7 = "como_puedo_usar_beneficios"


    /* Labels */
    personas = "personas";
    tarjetas = "tarjetas-de-credito"

    btnComoObt = "boton_como_obtenerla"


    linkMasBeneficios = "mastercard_ofertas_beneficios"

    losSigDocs = "los_siguientes_documentos"

    video1 = "activa_tu_tarjeta_digital"
    video2 = "activa_tu_tarjeta_sin_numeros"

    solicitudDeTdc = "solicitud_de_tarjeta"
    folleto = "folleto"
    comisiones = "comisiones"

    preg1 = "que_es_likeu"
    preg2 = "puedo_contratar_de_forma_digital"
    preg3 = "que_comisiones_tiene"
    preg4 = "como_funciona_la_tarjeta"
    preg5 = "que_paquetes_de_asistencia"
    preg6 = "cuales_son_los_telefonos"
    preg7 = "como_puedo_usar_beneficios"


    direccion1 = "www.asistenciasantanderlikeu.com.mx";
    celular1 = "55 5015 5096";

    celular2 = "55 5169 4300";
    direccion2 = "www.mastercard.com.mx/ofertasybeneficios";
    direccion3 = "www.asistenciasantanderlikeu.com.mx";
    celular3 = "55 5015 5096";



    /* Inicio Labels correspondientes a pregunta 7 */
    url1 = "www.mastercard.com.mx/ofertasybeneficios"
    url2 = "www.asistenciasantanderlikeu.com.mx"
    cel1 = "+1 (636) 722 7111"
    cel2 = "+55 5015 5096"
    cel3 = "55 5169 4300"
        /* Fin Labels correspondientes a pregunta 7*/

    free = "free_conoce_mas";
    light = "light_conoce_mas";
    aeromex = "aeromexico_infinite_conoce_mas";
    fiesta = "fiesta_rewards_platino_conoce_mas";
    blackUnlimit = "black_unlimited_mastercard_conoce_mas";


    desdeMexico = "desde_mexico_55-5169-4304";
    desdeExtranj = "desde_extranjero_1-844-705-80-77";

    tarjetas = "tarjetas_de_credito";
    cuentas = "cuentas";
    inversiones = "inversiones";
    credHipot = "credito_hipotecario";
    credAutom = "credito_automotriz";
    credPers = "credito_automotriz";
    seguros = "seguros";
    traeTuNom = "trae_tu_nomina";

    /*Nuevo label (link de sección "Activa tu asistencia")  */
    linkActivaAsistencia = "www.asistenciasantanderlikeu.com.mx"
    numeroCel = "55 5015 5096"



    opcBeneficios = "beneficios";
    opcRequisits = "requisitos";
    opcComoObt = "como_obtenerla";
    opcActiva  = "activa_tu_tarjeta";
    opcApoya = "apoya_una_causa";
    opcPregF = "preguntas_frecuentes";

    btnConoceMasBF = "conoce_mas"


    linkDescargarForm = "descargar_formato";

    linkFolletoInfo = "folleto_informativo";

   


}


const eventUtag = (paso1Action, paso1Label) => {

    let descargaDatos = new tags();

    utag.link({
        interaction_category: descargaDatos["category"], //required
        interaction_action: descargaDatos[paso1Action], //required
        interaction_label: descargaDatos[paso1Label], //required
    });

}